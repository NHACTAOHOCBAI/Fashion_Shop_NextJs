"use client";

import { useRef, useState } from "react";
import { Mic, StopCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Loading2 from "@/app/client/_components/Loading2";
import { searchByVoice } from "@/services/product.service";

/* ================= TYPES ================= */
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  brand: { id: number; name: string };
  category: { id: number; name: string };
  images: { id: number; imageUrl: string }[];
}

/* ================= COMPONENT ================= */
export default function VoiceSearchModal() {
  const [open, setOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [transcript, setTranscript] = useState("");

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    mediaRecorder.current = recorder;
    chunks.current = [];

    recorder.ondataavailable = (e) => chunks.current.push(e.data);

    recorder.onstop = async () => {
      const blob = new Blob(chunks.current, { type: "audio/webm" });
      const file = new File([blob], "voice.webm", { type: "audio/webm" });

      setLoading(true);
      const res = await searchByVoice(file);
      setTranscript(res.text);
      setProducts(res.data);
      setLoading(false);
    };

    recorder.start();
    setRecording(true);
    setOpen(true);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  return (
    <>
      {/* MIC BUTTON */}
      <Button
        variant="outline"
        size="icon"
        className="relative mx-[10px]"
        onClick={startRecording}
      >
        <Mic className="h-5 w-5" />
      </Button>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
          <DialogHeader className="shrink-0">
            <DialogTitle>Search by voice</DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto pr-2">
            <div className="flex flex-col gap-6">
              {/* RECORD CONTROL */}
              <div className="flex justify-center">
                {recording ? (
                  <Button
                    variant="destructive"
                    onClick={stopRecording}
                    className="gap-2"
                  >
                    <StopCircle className="h-4 w-4" /> Stop recording
                  </Button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Processing your voice...
                  </p>
                )}
              </div>

              {/* TRANSCRIPT */}
              {transcript && (
                <div className="rounded-lg border p-4 bg-muted text-sm">
                  <strong>Detected:</strong> {transcript}
                </div>
              )}

              {/* RESULTS */}
              <div>
                {loading ? (
                  <Loading2 />
                ) : products.length === 0 && transcript ? (
                  <p className="text-center text-muted-foreground">
                    No matching products found
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {products.map((product) => (
                      <VoiceSearchResultItem
                        key={product.id}
                        product={product}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ================= ITEM ================= */
function VoiceSearchResultItem({ product }: { product: Product }) {
  const imageUrl = product.images?.[0]?.imageUrl || "/placeholder.png";

  return (
    <Link
      href={`/client/products/product-detail/${product.id}`}
      className="flex gap-4 p-3 border rounded-xl hover:shadow transition cursor-pointer"
    >
      <Image
        src={imageUrl}
        alt={product.name}
        width={120}
        height={120}
        className="w-[120px] h-[120px] object-cover rounded-lg bg-muted"
      />

      <div className="flex flex-col justify-between flex-1">
        <div>
          <p className="text-sm font-medium line-clamp-2">{product.name}</p>

          <p className="text-xs text-muted-foreground mt-1">
            {product.brand.name} · {product.category.name}
          </p>

          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex justify-between items-end mt-2">
          <p className="text-base font-semibold text-primary">
            ${Number(product.price).toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
