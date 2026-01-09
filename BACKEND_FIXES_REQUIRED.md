# Backend Fixes for Livestream Issues

## Issue 1: ProductIds 400 Error Fix

### DTO File: `create-livestream.dto.ts`

Add `@Transform` decorator to parse JSON string from FormData:

```typescript
import { IsArray, IsNotEmpty, IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateLivestreamDto {
  @IsString()
  @IsNotEmpty({ message: 'Title can not be empty' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @Transform(({ value }) => {
    // Parse JSON string from FormData
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed.map(v => parseInt(String(v), 10)) : [];
      } catch {
        return [];
      }
    }
    // Already an array
    if (Array.isArray(value)) {
      return value.map(v => parseInt(String(v), 10));
    }
    return [];
  })
  productIds?: number[];

  @IsDateString()
  @IsOptional()
  scheduledAt?: Date;

  @IsString()
  @IsOptional()
  thumbnailUrl?: string;
}
```

### DTO File: `update-livestream.dto.ts`

Same transformation needed:

```typescript
import { IsArray, IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateLivestreamDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  @Transform(({ value }) => {
    // Parse JSON string from FormData
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed.map(v => parseInt(String(v), 10)) : [];
      } catch {
        return [];
      }
    }
    // Already an array
    if (Array.isArray(value)) {
      return value.map(v => parseInt(String(v), 10));
    }
    return [];
  })
  productIds?: number[];

  @IsDateString()
  @IsOptional()
  scheduledAt?: Date;

  @IsString()
  @IsOptional()
  thumbnailUrl?: string;
}
```

---

## Issue 2: Total Views Fix - Session-Based Tracking

### Problem
Current code increments `totalViews` on EVERY join, even if user refreshes within seconds.

```typescript
// ❌ WRONG - Always increments
livestream.totalViews += 1;
```

### Solution
Check if user has an existing view session in the last **30 minutes**. Only count as new view if no recent session exists.

### File: `livestreams.service.ts`

Update the `trackViewerJoinByUserId` method:

```typescript
async trackViewerJoinByUserId(
  livestreamId: number,
  userId: number | null,
  guestId?: string,
) {
  const livestream = await this.livestreamRepo.findOne({
    where: { id: livestreamId },
  });
  if (!livestream) {
    throw new HttpException('Livestream not found', HttpStatus.NOT_FOUND);
  }

  let user: User | null = null;
  if (userId) {
    user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  // ✅ Check for ACTIVE view first (leftAt is NULL)
  const whereCondition: any = {
    livestream: { id: livestreamId },
    leftAt: IsNull(),
  };

  if (user) {
    whereCondition.user = { id: user.id };
  } else if (guestId) {
    whereCondition.guestId = guestId;
  }

  const activeView = await this.viewRepo.findOne({ where: whereCondition });

  if (activeView) {
    console.log('[LivestreamService] Viewer already active, updating lastActivityAt');
    // Just update heartbeat, don't increment anything
    activeView.lastActivityAt = new Date();
    await this.viewRepo.save(activeView);
    return activeView;
  }

  // ✅ Check for RECENT session (within 30 minutes)
  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
  const recentSessionWhere: any = {
    livestream: { id: livestreamId },
    leftAt: Not(IsNull()), // Has left
    leftAt: MoreThan(thirtyMinutesAgo), // But left less than 30 min ago
  };

  if (user) {
    recentSessionWhere.user = { id: user.id };
  } else if (guestId) {
    recentSessionWhere.guestId = guestId;
  }

  const recentSession = await this.viewRepo.findOne({ where: recentSessionWhere });

  // ✅ Determine if this should count as a new unique view
  const shouldCountAsNewView = !recentSession;

  console.log('[LivestreamService] Join check:', {
    hasRecentSession: !!recentSession,
    willCountAsNewView: shouldCountAsNewView,
  });

  // Create new view record
  const view = this.viewRepo.create({
    livestream,
    user,
    guestId: user ? null : guestId || null,
    joinedAt: new Date(),
    lastActivityAt: new Date(),
  });

  await this.viewRepo.save(view);

  // ✅ Get actual active viewer count from database
  const activeViewerCount = await this.viewRepo.count({
    where: {
      livestream: { id: livestreamId },
      leftAt: IsNull(),
    },
  });

  livestream.currentViewers = activeViewerCount;

  // ✅ ONLY increment totalViews if no recent session (true unique view)
  if (shouldCountAsNewView) {
    livestream.totalViews += 1;
    console.log('[LivestreamService] ✅ Counted as NEW unique view');
  } else {
    console.log('[LivestreamService] ⏭️ Same session continuing - NOT counted as new view');
  }

  if (livestream.currentViewers > livestream.peakViewers) {
    livestream.peakViewers = livestream.currentViewers;
  }

  await this.livestreamRepo.save(livestream);

  console.log(
    `[LivestreamService] Viewer joined. Active: ${activeViewerCount}, Total: ${livestream.totalViews}`,
  );
  return view;
}
```

### Import Required
Add at the top of `livestreams.service.ts`:

```typescript
import { In, Repository, Not, IsNull, LessThan, MoreThan } from 'typeorm';
```

---

## Testing Scenarios

### Test 1: ProductIds
```bash
# Create livestream with 2 products
POST /livestreams
FormData:
  - title: "Test Stream"
  - productIds: "[1, 2]"  # JSON string
  - thumbnail: <file>

Expected: ✅ Success, products attached
```

### Test 2: Total Views - Refresh Within 30 Minutes
```
1. User joins livestream → totalViews = 1 ✅
2. User refreshes after 10 seconds → totalViews = 1 ✅ (same session)
3. User refreshes after 1 minute → totalViews = 1 ✅ (same session)
4. User closes tab, waits 5 minutes, rejoins → totalViews = 1 ✅ (within 30 min)
5. User closes tab, waits 31 minutes, rejoins → totalViews = 2 ✅ (new session)
```

### Test 3: Multiple Users
```
User A joins → totalViews = 1 ✅
User B joins → totalViews = 2 ✅
User A refreshes → totalViews = 2 ✅ (same session)
User C joins → totalViews = 3 ✅
```

---

## Summary

### Changes Made:

**Frontend:**
- ✅ Send `productIds` as JSON string in FormData
- ✅ Both create and edit pages updated

**Backend (Required):**
1. ✅ Add `@Transform` decorator to DTOs to parse JSON string
2. ✅ Update `trackViewerJoinByUserId` to check for recent sessions (30 min window)
3. ✅ Only increment `totalViews` for truly new unique views
4. ✅ Add `MoreThan` import from TypeORM

### Expected Behavior:
- ✅ ProductIds error 400 → Fixed
- ✅ Total views increasing on refresh → Fixed (30-minute session window)
- ✅ Accurate unique viewer tracking

**Apply these backend changes and test!** 🚀
