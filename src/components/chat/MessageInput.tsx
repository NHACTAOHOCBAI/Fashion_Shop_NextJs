"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Send,
  Image as ImageIcon,
  Video,
  Smile,
  X,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import VoiceRecorder from "./VoiceRecorder";

interface MessageInputProps {
  onSend: (
    content: string,
    files?: {
      images?: File[];
      voice?: File;
      video?: File;
    }
  ) => void | Promise<void>;
  onTyping?: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function MessageInput({
  onSend,
  onTyping,
  disabled = false,
  placeholder = "Type a message...",
}: MessageInputProps) {
  const [text, setText] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // File size limits (in bytes)
  const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB

  // Validate file size
  const validateFileSize = (file: File, maxSize: number, type: string) => {
    if (file.size > maxSize) {
      toast.error(
        `${type} file is too large. Max size: ${maxSize / 1024 / 1024}MB`
      );
      return false;
    }
    return true;
  };

  // Handle image selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((file) =>
      validateFileSize(file, MAX_IMAGE_SIZE, "Image")
    );

    if (validFiles.length > 0) {
      setImages((prev) => [...prev, ...validFiles].slice(0, 5)); // Max 5 images
    }

    // Reset input
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  // Handle video selection
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFileSize(file, MAX_VIDEO_SIZE, "Video")) {
      setVideo(file);
    }

    // Reset input
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
  };

  // Handle voice recording
  const handleVoiceRecord = async (audioBlob: Blob) => {
    // Convert blob to file with proper name
    const timestamp = new Date().getTime();
    const voiceFile = new File(
      [audioBlob],
      `voice-message-${timestamp}.webm`,
      {
        type: "audio/webm",
      }
    );

    // Send immediately after recording
    setIsSending(true);
    try {
      await onSend("", {
        voice: voiceFile,
      });
      setShowVoiceRecorder(false);
    } catch (error: any) {
      toast.error(error?.message || "Failed to send voice message");
      throw error;
    } finally {
      setIsSending(false);
    }
  };

  // Remove image
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Clear all attachments
  const clearAllAttachments = () => {
    setImages([]);
    setVideo(null);
  };

  // Handle emoji select
  const handleEmojiSelect = (emoji: any) => {
    setText((prev) => prev + emoji.native);
    setEmojiOpen(false);
    inputRef.current?.focus();
  };

  // Handle send
  const handleSend = async () => {
    const trimmedText = text.trim();
    const hasFiles = images.length > 0 || video;

    // Validate: must have content or files
    if (!trimmedText && !hasFiles) {
      toast.error("Please type a message or attach a file");
      return;
    }

    setIsSending(true);

    try {
      await onSend(trimmedText, {
        images: images.length > 0 ? images : undefined,
        video: video || undefined,
      });

      // Clear input after successful send
      setText("");
      clearAllAttachments();
      inputRef.current?.focus();
    } catch (error: any) {
      toast.error(error?.message || "Failed to send message");
    } finally {
      setIsSending(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle typing
  const handleTextChange = (value: string) => {
    setText(value);
    onTyping?.();
  };

  const hasAttachments = images.length > 0 || video;
  const canSend = (text.trim().length > 0 || hasAttachments) && !isSending;

  // If voice recorder is active, only show voice recorder UI
  if (showVoiceRecorder) {
    return (
      <div className="border-t bg-background">
        <div className="flex items-center justify-between gap-2 p-3">
          <VoiceRecorder
            onSend={handleVoiceRecord}
            onCancel={() => setShowVoiceRecorder(false)}
            disabled={disabled}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="border-t bg-background">
      {/* Attachments Preview */}
      {hasAttachments && (
        <div className="px-4 pt-3 pb-2 border-b">
          <div className="flex items-start gap-2 flex-wrap">
            {/* Image previews */}
            {images.map((img, i) => (
              <div key={i} className="relative group">
                <img
                  src={URL.createObjectURL(img)}
                  alt={`Preview ${i + 1}`}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(i)}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}

            {/* Video preview */}
            {video && (
              <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
                <Video className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{video.name}</span>
                <button
                  onClick={() => setVideo(null)}
                  className="ml-2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex items-center gap-2 p-3">
        {/* Attachment buttons */}
        <div className="flex items-center gap-1">
          {/* Image upload */}
          <Button
            size="icon"
            variant="ghost"
            disabled={disabled || isSending || images.length >= 5}
            onClick={() => imageInputRef.current?.click()}
            title="Attach images (max 5)"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            multiple
            className="hidden"
            onChange={handleImageSelect}
          />

          {/* Voice recorder button */}
          <Button
            size="icon"
            variant="ghost"
            disabled={disabled || isSending}
            onClick={() => setShowVoiceRecorder(true)}
            title="Record voice message"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </Button>

          {/* Video upload */}
          <Button
            size="icon"
            variant="ghost"
            disabled={disabled || isSending || !!video}
            onClick={() => videoInputRef.current?.click()}
            title="Attach video"
          >
            <Video className="h-4 w-4" />
          </Button>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/mp4,video/quicktime,video/x-msvideo,video/webm"
            className="hidden"
            onChange={handleVideoSelect}
          />

          {/* Emoji picker */}
          <Popover open={emojiOpen} onOpenChange={setEmojiOpen}>
            <PopoverTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                disabled={disabled || isSending}
                title="Add emoji"
              >
                <Smile className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-0" align="start">
              <Picker
                data={data}
                onEmojiSelect={handleEmojiSelect}
                theme="auto"
                previewPosition="none"
                skinTonePosition="none"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Text input */}
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={disabled || isSending}
          className="rounded-full flex-1"
        />

        {/* Send button */}
        <Button
          size="icon"
          onClick={handleSend}
          disabled={!canSend || disabled}
          className="shrink-0"
        >
          {isSending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
