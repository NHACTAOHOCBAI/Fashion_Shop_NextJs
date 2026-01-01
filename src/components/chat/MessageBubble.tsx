"use client";

import { useState } from "react";
import { Image as ImageIcon, Play, Pause, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MessageBubbleProps {
  message: ChatMessage;
  isMe: boolean;
  showSenderName?: boolean;
}

export default function MessageBubble({
  message,
  isMe,
  showSenderName = false,
}: MessageBubbleProps) {
  const [playingVoice, setPlayingVoice] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null
  );

  const hasContent = message.content && message.content.trim().length > 0;
  const hasAttachments =
    message.attachments && message.attachments.length > 0;

  // Format file size
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  // Format duration
  const formatDuration = (seconds?: number) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Toggle voice playback
  const toggleVoicePlayback = (url: string) => {
    if (audioElement) {
      if (playingVoice) {
        audioElement.pause();
        setPlayingVoice(false);
      } else {
        audioElement.play();
        setPlayingVoice(true);
      }
    } else {
      const audio = new Audio(url);
      audio.addEventListener("ended", () => setPlayingVoice(false));
      audio.play();
      setAudioElement(audio);
      setPlayingVoice(true);
    }
  };

  // Render image attachment
  const renderImage = (attachment: MessageAttachment) => (
    <div key={attachment.publicId} className="relative group">
      <img
        src={attachment.url}
        alt="Image"
        className="max-w-[300px] max-h-[300px] rounded-lg object-cover cursor-pointer hover:opacity-90 transition"
        onClick={() => window.open(attachment.url, "_blank")}
      />
      <a
        href={attachment.url}
        download
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition"
      >
        <Button size="icon" variant="secondary" className="h-8 w-8">
          <Download className="h-4 w-4" />
        </Button>
      </a>
      {attachment.fileSize && (
        <div className="text-xs text-muted-foreground mt-1">
          {formatFileSize(attachment.fileSize)}
        </div>
      )}
    </div>
  );

  // Render voice attachment
  const renderVoice = (attachment: MessageAttachment) => (
    <div
      key={attachment.publicId}
      className={`flex items-center gap-3 p-3 rounded-lg ${
        isMe ? "bg-primary/10" : "bg-muted"
      }`}
    >
      <Button
        size="icon"
        variant={isMe ? "default" : "secondary"}
        onClick={() => toggleVoicePlayback(attachment.url)}
        className="shrink-0"
      >
        {playingVoice ? (
          <Pause className="h-4 w-4" />
        ) : (
          <Play className="h-4 w-4" />
        )}
      </Button>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium">Voice message</div>
        <div className="text-xs text-muted-foreground">
          {formatDuration(attachment.duration)} •{" "}
          {formatFileSize(attachment.fileSize)}
        </div>
      </div>
      <a
        href={attachment.url}
        download={attachment.fileName}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button size="icon" variant="ghost" className="h-8 w-8 shrink-0">
          <Download className="h-4 w-4" />
        </Button>
      </a>
    </div>
  );

  // Render video attachment
  const renderVideo = (attachment: MessageAttachment) => (
    <div key={attachment.publicId} className="relative group">
      <video
        src={attachment.url}
        controls
        className="max-w-[350px] max-h-[350px] rounded-lg"
        preload="metadata"
      />
      <div className="text-xs text-muted-foreground mt-1">
        {formatDuration(attachment.duration)} •{" "}
        {formatFileSize(attachment.fileSize)}
      </div>
    </div>
  );

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[70%] space-y-1`}>
        {/* Sender name (for group chats or admin view) */}
        {showSenderName && !isMe && (
          <div className="text-xs text-muted-foreground px-2">
            {message.sender.fullName}
          </div>
        )}

        {/* Message bubble */}
        <div
          className={`rounded-2xl px-4 py-2 ${
            isMe
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          {/* Text content */}
          {hasContent && (
            <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.content}
            </div>
          )}

          {/* Attachments */}
          {hasAttachments && (
            <div
              className={`space-y-2 ${hasContent ? "mt-2" : ""}`}
            >
              {message.attachments!.map((attachment) => {
                switch (attachment.type) {
                  case "image":
                    return renderImage(attachment);
                  case "voice":
                    return renderVoice(attachment);
                  case "video":
                    return renderVideo(attachment);
                  default:
                    return null;
                }
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
