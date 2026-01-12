"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Upload, X } from "lucide-react";
import { toast } from "sonner";

interface VoiceInputButtonProps {
  onAudioReady: (audioBlob: Blob, audioUrl: string) => void;
  onAudioClear?: () => void;
  disabled?: boolean;
}

export default function VoiceInputButton({
  onAudioReady,
  onAudioClear,
  disabled,
}: VoiceInputButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        onAudioReady(blob, url);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Cannot access microphone. Please check permissions.");
    }
  };

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate audio file
    const validTypes = ["audio/mpeg", "audio/wav", "audio/webm", "audio/ogg", "audio/m4a"];
    if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|webm|ogg|m4a)$/i)) {
      toast.error("Please select a valid audio file (mp3, wav, webm, ogg, m4a)");
      return;
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Audio file must be less than 10MB");
      return;
    }

    const url = URL.createObjectURL(file);
    setAudioBlob(file);
    setAudioUrl(url);
    onAudioReady(file, url);
  };

  const clearAudio = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onAudioClear?.(); // Notify parent
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,.mp3,.wav,.webm,.ogg,.m4a"
        onChange={handleFileUpload}
        className="hidden"
        disabled={disabled || isRecording || !!audioBlob}
      />

      {!audioBlob && !isRecording && (
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={startRecording}
            disabled={disabled}
            className="gap-1.5 text-xs h-8 px-3"
          >
            <Mic className="h-3.5 w-3.5" />
            <span>Record</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="gap-1.5 text-xs h-8 px-3"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Upload</span>
          </Button>
        </div>
      )}

      {isRecording && (
        <div className="flex items-center gap-2 bg-destructive/10 px-4 py-2 rounded-lg animate-pulse flex-1">
          <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
          <span className="text-sm font-medium">{formatTime(recordingTime)}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="ml-auto gap-1"
            onClick={stopRecording}
          >
            <Square className="h-3 w-3 fill-current" />
            <span className="text-xs">Stop</span>
          </Button>
        </div>
      )}

      {audioBlob && audioUrl && (
        <div className="flex items-center gap-1.5 bg-primary/5 border border-primary/20 px-2 py-1 rounded-lg flex-1 max-w-full">
          <audio src={audioUrl} controls className="h-7 flex-1 min-w-0" style={{ maxWidth: 'calc(100% - 32px)' }} />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 shrink-0 hover:bg-destructive/10 hover:text-destructive"
            onClick={clearAudio}
            title="Clear audio"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
