"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Trash2, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface VoiceRecorderProps {
  onSend: (audioBlob: Blob) => void | Promise<void>;
  onCancel?: () => void;
  disabled?: boolean;
}

export default function VoiceRecorder({
  onSend,
  onCancel,
  disabled = false,
}: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isSending, setIsSending] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);

        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Could not access microphone. Please check permissions.");
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Cancel recording
  const cancelRecording = () => {
    if (isRecording) {
      stopRecording();
    }

    setAudioBlob(null);
    setRecordingTime(0);
    chunksRef.current = [];

    if (onCancel) {
      onCancel();
    }
  };

  // Send recorded audio
  const sendAudio = async () => {
    if (!audioBlob) return;

    setIsSending(true);
    try {
      await onSend(audioBlob);

      // Reset after sending
      setAudioBlob(null);
      setRecordingTime(0);
      chunksRef.current = [];
    } catch (error: any) {
      toast.error(error?.message || "Failed to send voice message");
    } finally {
      setIsSending(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // If not recording and no audio recorded, show record button
  if (!isRecording && !audioBlob) {
    return (
      <Button
        size="icon"
        variant="ghost"
        onClick={startRecording}
        disabled={disabled}
        title="Record voice message"
        className="shrink-0"
      >
        <Mic className="h-4 w-4" />
      </Button>
    );
  }

  // If recording, show stop button with timer
  if (isRecording) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-full border border-primary/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm font-mono text-foreground">
            {formatTime(recordingTime)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={cancelRecording}
            className="h-8 w-8"
            title="Cancel"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            onClick={stopRecording}
            className="h-8 w-8 bg-red-500 hover:bg-red-600"
            title="Stop recording"
          >
            <Square className="h-3 w-3" />
          </Button>
        </div>
      </div>
    );
  }

  // If audio recorded, show preview with send/cancel buttons
  if (audioBlob) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-full border">
        <div className="flex items-center gap-2">
          <Mic className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-mono">
            {formatTime(recordingTime)}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={cancelRecording}
            disabled={isSending}
            className="h-8 w-8"
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <Button
            size="icon"
            onClick={sendAudio}
            disabled={isSending}
            className="h-8 w-8"
            title="Send voice message"
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

  return null;
}
