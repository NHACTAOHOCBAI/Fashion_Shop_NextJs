export enum LivestreamStatus {
  Scheduled = "scheduled",
  Live = "live",
  Ended = "ended",
  Cancelled = "cancelled",
}

export interface Livestream {
  messageCount: number;
  id: number;
  title: string;
  description?: string;
  streamKey: string;
  status: LivestreamStatus;
  isActive: boolean;
  scheduledAt?: string;
  startedAt?: string;
  endedAt?: string;
  currentViewers: number;
  peakViewers: number;
  totalViews: number;
  thumbnailUrl?: string;
  recordingUrl?: string;
  user: User;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

export interface LivestreamMessage {
  id: number;
  livestream: Livestream | { id: number };
  user: User;
  content: string;
  isPinned: boolean;
  isDeleted: boolean;
  createdAt: string;
}

export interface LivestreamView {
  id: number;
  livestream: Livestream | { id: number };
  user?: User | null;
  guestId?: string | null;
  joinedAt: string;
  leftAt?: string | null;
  watchDuration: number;
  createdAt: string;
  updatedAt: string;
}

export interface LivestreamPinnedProduct {
  id: number;
  livestream: Livestream | { id: number };
  product: Product;
  clickCount: number;
  addToCartCount: number;
  pinnedAt: string;
  unpinnedAt?: string | null;
  createdAt: string;
}

export interface CreateLivestreamDto {
  title: string;
  description?: string;
  productIds?: number[];
  scheduledAt?: string;
  thumbnailUrl?: string;
}

export interface UpdateLivestreamDto {
  title?: string;
  description?: string;
  productIds?: number[];
  scheduledAt?: string;
  thumbnailUrl?: string;
}

export interface QueryLivestreamDto {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
  status?: LivestreamStatus;
  userId?: number;
}

export interface LivestreamAnalytics {
  livestream: {
    id: number;
    title: string;
    status: LivestreamStatus;
    startedAt?: string;
    endedAt?: string;
  };
  viewers: {
    total: number;
    peak: number;
    current: number;
    avgWatchDuration: number;
  };
  engagement: {
    totalMessages: number;
    totalProductClicks: number;
    totalAddToCarts: number;
  };
  products: Array<{
    productId: number;
    productName: string;
    clicks: number;
    addToCarts: number;
    pinnedAt: string;
    unpinnedAt?: string | null;
  }>;
}

export interface PaginatedLivestreamsResponse {
  data: Livestream[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// WebSocket event payloads
export interface JoinStreamDto {
  livestreamId: number;
  guestId?: string;
}

export interface SendMessageDto {
  livestreamId: number;
  content: string;
}

export interface PinProductDto {
  livestreamId: number;
  productId: number;
}

export interface UnpinProductDto {
  livestreamId: number;
  productId: number;
}

export interface TrackProductClickDto {
  livestreamId: number;
  productId: number;
}

export interface LeaveStreamDto {
  livestreamId: number;
}

// WebSocket event responses
export interface ViewerJoinedEvent {
  viewerCount: number;
  timestamp: string;
}

export interface ViewerLeftEvent {
  viewerCount: number;
  timestamp: string;
}

export interface NewLiveMessageEvent {
  id: number;
  userId: number;
  user: {
    id: number;
    fullName: string;
    avatar?: string;
  };
  content: string;
  isPinned: boolean;
  createdAt: string;
}

export interface ProductPinnedEvent {
  id: number;
  product: Product;
  pinnedAt: string;
}

export interface ProductUnpinnedEvent {
  productId: number;
  timestamp: string;
}

export interface MessageDeletedEvent {
  messageId: number;
  timestamp: string;
}

export interface MessagePinnedEvent {
  messageId: number;
  message: LivestreamMessage;
  timestamp: string;
}

export interface LivestreamStartedEvent {
  id: number;
  title: string;
  host: User;
  timestamp: string;
}

export interface LivestreamEndedEvent {
  id: number;
  timestamp: string;
}
