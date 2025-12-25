"use client";

import { useRef, useState } from "react";
import { Mic, StopCircle, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BaseModal } from "@/components/modals/BaseModal";
import { ProductSearchResultItem } from "@/app/client/_components/ProductSearchResultItem";
import { searchByVoice } from "@/services/product.service";
import { motion, AnimatePresence } from "framer-motion";

export default function VoiceSearchModal() {
  const [open, setOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [transcript, setTranscript] = useState("");

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorder.current = recorder;
      chunks.current = [];

      recorder.ondataavailable = (e) => chunks.current.push(e.data);

      recorder.onstop = async () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const file = new File([blob], "voice.webm", { type: "audio/webm" });

        setLoading(true);
        try {
          const res = await searchByVoice(file);
          setTranscript(res.text);
          setProducts(res.data);
        } catch (error) {
          console.error("Voice search failed:", error);
        } finally {
          setLoading(false);
        }

        // Stop all audio tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setRecording(true);
      setOpen(true);
    } catch (error) {
      console.error("Failed to start recording:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  const handleClose = () => {
    if (recording) {
      stopRecording();
    }
    setOpen(false);
    setTranscript("");
    setProducts([]);
  };

  return (
    <>
      {/* MIC BUTTON */}
      <Button
        variant="outline"
        size="icon"
        className="relative mx-[10px] hover:border-[#40BFFF] hover:text-[#40BFFF] transition-colors"
        onClick={startRecording}
      >
        <Mic className="h-5 w-5" />
      </Button>

      {/* MODAL */}
      <BaseModal
        open={open}
        onOpenChange={handleClose}
        title="Voice Search"
        description={
          transcript
            ? `Found ${products.length} result${products.length !== 1 ? "s" : ""}`
            : recording
            ? "Listening to your voice..."
            : "Processing your request..."
        }
        icon={<Volume2 size={20} />}
        maxWidth="max-w-3xl"
      >
        <div className="space-y-6">
          {/* RECORDING CONTROL */}
          <div className="flex flex-col items-center gap-4">
            <AnimatePresence mode="wait">
              {recording ? (
                <motion.div
                  key="recording"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center gap-4"
                >
                  {/* Animated Mic Icon */}
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-red-500/20"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
                      <Mic className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  <Button
                    variant="destructive"
                    onClick={stopRecording}
                    className="gap-2 px-6"
                  >
                    <StopCircle className="h-4 w-4" />
                    Stop Recording
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Volume2 className="w-4 h-4" />
                  </motion.div>
                  Processing your voice...
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* TRANSCRIPT */}
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-gradient-to-r from-[#40BFFF]/5 to-transparent border border-[#40BFFF]/20 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#40BFFF]/10 flex items-center justify-center flex-shrink-0">
                  <Volume2 className="w-4 h-4 text-[#40BFFF]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                    You said:
                  </p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    "{transcript}"
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* RESULTS */}
          <div>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 rounded-full border-4 border-[#40BFFF]/20 border-t-[#40BFFF]"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Searching for products...
                </p>
              </div>
            ) : products.length === 0 && transcript ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                  <Mic className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
                  No products found
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Try describing the product differently
                </p>
              </motion.div>
            ) : products.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Search Results ({products.length})
                </p>
                <div className="flex flex-col gap-3">
                  {products.map((product, index) => (
                    <ProductSearchResultItem
                      key={product.id}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </BaseModal>
    </>
  );
}
