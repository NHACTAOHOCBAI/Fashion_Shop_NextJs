# Chat System Integration Guide

## 📋 Tổng quan

Hệ thống chat đã được tích hợp hoàn chỉnh với các tính năng:
- ✅ Chat real-time giữa user và admin
- ✅ Gửi tin nhắn văn bản + emoji picker
- ✅ Upload và gửi hình ảnh (tối đa 5 ảnh/tin nhắn)
- ✅ **Ghi âm voice message trực tiếp từ microphone** (thay vì upload file)
- ✅ Gửi video
- ✅ Typing indicator (hiển thị khi đang gõ)
- ✅ Message seen/sent status
- ✅ Auto-scroll to bottom
- ✅ Conversation management cho admin

## 🏗️ Cấu trúc Code

### 1. Interfaces & Types
**File:** `src/interfaces/chat.d.ts`

Định nghĩa các types:
- `ChatMessage` - Tin nhắn với attachments
- `Conversation` - Cuộc trò chuyện
- `MessageAttachment` - File đính kèm (image/voice/video)
- `ConversationUser` - User info trong conversation

### 2. Services
**File:** `src/services/chat.service.ts`

API calls:
- `getOrCreateConversation()` - User tạo/lấy conversation
- `getAllConversations()` - Admin lấy tất cả conversations
- `getMessages(conversationId)` - Lấy messages
- `sendMessage(dto, files)` - Gửi tin nhắn (text + files)
- `markMessagesSeen(conversationId)` - Đánh dấu đã xem

### 3. React Query Hooks
**File:** `src/hooks/queries/useChat.ts`

Custom hooks:
- `useGetOrCreateConversation()` - Query conversation
- `useGetAllConversations()` - Admin query all conversations
- `useGetMessages(conversationId)` - Query messages
- `useSendMessage()` - Mutation gửi message
- `useMarkMessagesSeen()` - Mutation mark seen

### 4. Components

#### `MessageBubble.tsx`
Hiển thị tin nhắn với:
- Text content
- Image attachments (có preview + download)
- Voice attachments (có play/pause + download)
- Video attachments (có video player)

#### `VoiceRecorder.tsx`
**Component mới** - Ghi âm trực tiếp:
- Record voice từ microphone (Web Audio API)
- Real-time timer hiển thị thời gian ghi (MM:SS)
- Red pulse indicator khi đang ghi
- Stop/Cancel buttons
- Preview audio với Send/Delete options
- Auto-convert Blob sang File để upload
- Microphone permission handling

#### `MessageInput.tsx`
Input component với:
- Text input + emoji picker
- Image upload button (max 5)
- **Voice recorder button** (mở VoiceRecorder)
- Video upload button
- File preview trước khi gửi
- Validation file size
- Toggle giữa normal input và voice recorder mode

#### `ChatWindow.tsx`
Main chat window:
- Header với avatar + tên
- Messages area với auto-scroll
- Typing indicator
- Seen/sent status
- WebSocket integration

#### `ConversationList.tsx`
Danh sách conversations:
- Avatar + tên
- Last message time
- Status badge (Open/Handling)
- Admin info (cho admin view)

### 5. Pages

#### User Chat Page
**File:** `src/app/client/my-account/chat/page.tsx`

- URL: `/client/my-account/chat`
- Auto create conversation nếu chưa có
- Hiển thị "Support Team" hoặc admin đã assign
- Full-screen chat window

#### Admin Chat Page
**File:** `src/app/admin/chat/page.tsx`

- URL: `/admin/chat`
- Sidebar: Danh sách customers
- Main: Chat window với customer đã chọn
- Auto-refresh mỗi 5 giây

## 🚀 Cách sử dụng

### User (Customer)
1. Truy cập `/client/my-account/chat`
2. Hệ thống tự động tạo conversation
3. Chat với Support Team/Admin
4. **Gửi voice message:**
   - Click icon microphone
   - Cho phép browser access microphone (nếu lần đầu)
   - Nói tin nhắn (timer sẽ chạy)
   - Click Stop (nút vuông đỏ)
   - Preview và click Send, hoặc Delete để hủy
5. Gửi text, emoji, ảnh, video

### Admin
1. Truy cập `/admin/chat`
2. Xem danh sách customers trong sidebar
3. Click vào customer để xem chat
4. Reply tin nhắn (status tự động chuyển sang "Handling")

## 🔌 WebSocket Events

Đã tích hợp với backend WebSocket:

```typescript
// Join conversation
socket.emit("joinConversation", conversationId)

// Leave conversation
socket.emit("leaveConversation", conversationId)

// Typing event
socket.emit("typing", { conversationId, userId, isTyping })

// Receive new message
socket.on("newMessage", (message) => { ... })

// Receive typing event
socket.on("typing", (data) => { ... })

// Receive seen event
socket.on("seen", () => { ... })
```

## 📦 Dependencies

Đã cài đặt:
- `socket.io-client` - WebSocket
- `sonner` - Toast notifications
- `@emoji-mart/data` - Emoji data
- `@emoji-mart/react` - Emoji picker component
- `@tanstack/react-query` - Data fetching

## ⚙️ Configuration

### Environment Variables
Đảm bảo có biến:
```env
NEXT_PUBLIC_BE_BASE_URL=http://localhost:3000/api
```

### WebSocket URL
Cấu hình trong `src/lib/socket2.ts`:
```typescript
export const socket = io("http://localhost:4000", {
  withCredentials: true,
  transports: ["websocket"],
});
```

## 🎨 UI/UX Features

1. **Auto-scroll**: Tự động scroll xuống khi có tin nhắn mới
2. **Time grouping**: Hiển thị thời gian mỗi 5 phút
3. **Typing indicator**: Hiển thị "... is typing" khi đối phương đang gõ
4. **Seen status**: Hiển thị "Seen" hoặc "Sent" cho tin nhắn
5. **Voice Recording**:
   - Real-time recording với timer
   - Red pulse animation khi đang ghi
   - Preview trước khi gửi
   - One-click send sau khi ghi
   - Microphone permission handling
6. **Loading states**: Loading indicators cho tất cả async operations
7. **Error handling**: Toast notifications cho lỗi
8. **File previews**: Preview ảnh/video trước khi gửi
9. **Responsive**: Mobile-friendly design

## 🔧 Customization

### Thay đổi file size limits
Trong `MessageInput.tsx`:
```typescript
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VOICE_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
```

### Thay đổi max số ảnh
Trong `MessageInput.tsx`:
```typescript
setImages((prev) => [...prev, ...validFiles].slice(0, 5)); // Max 5 images
```

### Thay đổi auto-refresh interval (Admin)
Trong `useChat.ts`:
```typescript
export const useGetAllConversations = () => {
  return useQuery({
    queryKey: chatKeys.adminConversations(),
    queryFn: chatService.getAllConversations,
    refetchInterval: 5000, // 5 seconds
  });
};
```

## 🐛 Troubleshooting

### Tin nhắn không real-time?
- Kiểm tra WebSocket connection trong browser console
- Verify backend WebSocket server đang chạy
- Check CORS settings

### File upload không hoạt động?
- Kiểm tra backend có Cloudinary config chưa
- Verify file size không vượt quá limit
- Check MIME types được accept

### Messages không load?
- Check API endpoint đúng chưa
- Verify authentication token
- Check React Query DevTools để debug

## 📝 Notes

1. **Clean Code**: Code tuân thủ convention của project
2. **TypeScript**: Full type safety với interfaces
3. **Error Handling**: Toast notifications cho mọi lỗi
4. **Accessibility**: Semantic HTML + ARIA labels
5. **Performance**: React Query caching + optimistic updates

## 🎯 Next Steps (Optional Enhancements)

Các tính năng có thể bổ sung thêm:
- [ ] File attachments (PDF, documents)
- [ ] Message reactions (like, love, etc.)
- [ ] Message reply/quote
- [ ] Message search
- [ ] Conversation archive
- [ ] Read receipts per user
- [ ] Push notifications
- [ ] Voice recording trong browser
- [ ] Image editor trước khi gửi

---

**Tác giả:** Claude Code
**Ngày:** 2026-01-01
**Version:** 1.0.0
