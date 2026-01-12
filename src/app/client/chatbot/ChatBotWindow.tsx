"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Trash2, MessageSquare, Image as ImageIcon, Mic } from "lucide-react";
import { 
  askChat, 
  askChatWithImage, 
  askChatWithVoice, 
  getChatHistory, 
  clearChatHistory 
} from "@/services/chatbot.service";
import ChatMessageBubble from "@/components/chat/ChatMessageBubble";
import ImageUploadButton from "@/components/chat/ImageUploadButton";
import VoiceInputButton from "@/components/chat/VoiceInputButton";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ================= TYPES ================= */
type InputMode = "text" | "image" | "voice";

/* ================= UTILS ================= */
const shouldShowTime = (curr: BotMessage, prev?: BotMessage) => {
  if (!curr.createdAt) return false;
  if (!prev?.createdAt) return true;
  const diff =
    new Date(curr.createdAt).getTime() - new Date(prev.createdAt).getTime();
  return diff > 5 * 60 * 1000;
};

/* ================= COMPONENT ================= */
export default function ChatbotWindow() {
  const [messages, setMessages] = useState<BotMessage[]>([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>("text");
  
  // Image state
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Voice state
  const [selectedAudio, setSelectedAudio] = useState<Blob | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ================= LOAD ================= */
  useEffect(() => {
    getChatHistory().then(setMessages);
  }, []);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  /* ================= SEND TEXT ================= */
  const sendTextMessage = async () => {
    if (!text.trim()) return;

    const userMsg: BotMessage = {
      role: "user",
      content: text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setText("");
    setTyping(true);

    try {
      const res = await askChat(userMsg.content);
      setTyping(false);

      const botMsg: BotMessage = {
        role: "assistant",
        content: res.answer,
        products: res.products || [],
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setTyping(false);
      toast.error("Failed to send message");
      console.error(error);
    }
    
    inputRef.current?.focus();
  };

  /* ================= SEND IMAGE ================= */
  const sendImageMessage = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first");
      return;
    }

    const userMsg: BotMessage = {
      role: "user",
      content: text.trim() || "Sent an image to search for similar products",
      metadata: {
        type: "image",
        hasImage: true,
        imageUrl: imagePreview || "",
      },
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setText("");
    setTyping(true);

    try {
      const res = await askChatWithImage(selectedImage, text.trim());
      setTyping(false);

      const botMsg: BotMessage = {
        role: "assistant",
        content: res.answer,
        products: res.products || [],
        metadata: {
          type: "image_response",
          hasImage: true,
          imageUrl: res.imageUrl,
          productsFound: res.products?.length || 0,
        },
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
      
      // Clear image selection
      setSelectedImage(null);
      setImagePreview(null);
      toast.success("Image processed successfully");
    } catch (error) {
      setTyping(false);
      toast.error("Failed to process image");
      console.error(error);
    }
  };

  /* ================= SEND VOICE ================= */
  const sendVoiceMessage = async () => {
    if (!selectedAudio) {
      toast.error("Please record or upload audio first");
      return;
    }

    const userMsg: BotMessage = {
      role: "user",
      content: "Sent a voice message",
      metadata: {
        type: "voice",
        hasAudio: true,
        audioUrl: audioPreview || "",
      },
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    try {
      // Convert Blob to File if needed
      const audioFile = selectedAudio instanceof File 
        ? selectedAudio 
        : new File([selectedAudio], "recording.webm", { type: "audio/webm" });

      const res = await askChatWithVoice(audioFile);
      setTyping(false);

      // Update user message with transcription
      setMessages((prev) => 
        prev.map((msg, idx) => 
          idx === prev.length - 1 
            ? { ...msg, content: `🎤 "${res.transcribed}"` }
            : msg
        )
      );

      const botMsg: BotMessage = {
        role: "assistant",
        content: res.answer,
        products: res.products || [],
        metadata: {
          type: "voice_response",
          hasAudio: true,
          audioUrl: res.audioUrl,
          productsFound: res.products?.length || 0,
        },
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMsg]);
      
      // Clear audio selection
      setSelectedAudio(null);
      setAudioPreview(null);
      toast.success("Voice processed successfully");
    } catch (error) {
      setTyping(false);
      toast.error("Failed to process voice");
      console.error(error);
    }
  };

  /* ================= HANDLE SEND ================= */
  const handleSend = () => {
    switch (inputMode) {
      case "text":
        sendTextMessage();
        break;
      case "image":
        sendImageMessage();
        break;
      case "voice":
        sendVoiceMessage();
        break;
    }
  };

  /* ================= CLEAR HISTORY ================= */
  const handleClearHistory = async () => {
    try {
      await clearChatHistory();
      setMessages([]);
      toast.success("Chat history cleared successfully");
    } catch (error) {
      toast.error("Failed to clear chat history");
      console.error(error);
    }
  };

  /* ================= CALLBACKS ================= */
  const handleImageSelect = (file: File, previewUrl: string) => {
    setSelectedImage(file);
    setImagePreview(previewUrl);
  };

  const handleAudioReady = (audioBlob: Blob, audioUrl: string) => {
    setSelectedAudio(audioBlob);
    setAudioPreview(audioUrl);
  };

  const handleAudioClear = () => {
    setSelectedAudio(null);
    setAudioPreview(null);
  };

  /* ================= UI ================= */
  return (
    <div className="flex flex-col h-full max-h-[80vh] min-h-[400px]">
      {/* ===== HEADER ===== */}
      <div className="h-14 border-b px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">AI Assistant</p>
            <p className="text-xs text-muted-foreground">
              {typing ? "Typing..." : "Online"}
            </p>
          </div>
        </div>
        
        {/* Clear History Button */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="gap-2 mr-8"
              disabled={messages.length === 0}
            >
              <Trash2 className="h-4 w-4" />
              <span className="text-xs">Clear</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear chat history?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete all your chat messages with the AI assistant.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearHistory}>
                Clear
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {/* ===== MESSAGES ===== */}
      <ScrollArea className="flex-1 px-4 py-3 overflow-y-auto">
        <div className="space-y-3">
          {messages.map((m, i) => {
            const prev = messages[i - 1];
            const isMe = m.role === "user";
            const showTime = shouldShowTime(m, prev);

            return (
              <div key={i} className="space-y-1">
                {showTime && (
                  <div className="text-center text-xs text-muted-foreground">
                    {new Date(m.createdAt!).toLocaleString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </div>
                )}

                <div
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <ChatMessageBubble message={m} isUser={isMe} />
                </div>
              </div>
            );
          })}

          {typing && (
            <div className="text-xs text-muted-foreground animate-pulse">
              AI is thinking...
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* ===== INPUT MODES ===== */}
      <div className="border-t px-3 py-2 shrink-0">
        <Tabs value={inputMode} onValueChange={(v) => setInputMode(v as InputMode)}>
          <TabsList className="w-full grid grid-cols-3 mb-2">
            <TabsTrigger value="text" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="text-xs">Text</span>
            </TabsTrigger>
            <TabsTrigger value="image" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              <span className="text-xs">Image</span>
            </TabsTrigger>
            <TabsTrigger value="voice" className="gap-2">
              <Mic className="h-4 w-4" />
              <span className="text-xs">Voice</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* ===== TEXT INPUT ===== */}
        {inputMode === "text" && (
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="rounded-full"
            />
            <Button size="icon" onClick={handleSend} disabled={!text.trim() || typing}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* ===== IMAGE INPUT ===== */}
        {inputMode === "image" && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <ImageUploadButton onImageSelect={handleImageSelect} disabled={typing} />
              <Input
                placeholder="Optional: Add a message with the image..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="rounded-full flex-1"
              />
              <Button 
                size="icon" 
                onClick={handleSend} 
                disabled={!selectedImage || typing}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ===== VOICE INPUT ===== */}
        {inputMode === "voice" && (
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1">
              <VoiceInputButton 
                onAudioReady={handleAudioReady} 
                onAudioClear={handleAudioClear}
                disabled={typing} 
              />
            </div>
            <Button 
              size="icon" 
              onClick={handleSend} 
              disabled={!selectedAudio || typing}
              className="shrink-0"
              title="Send voice message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
