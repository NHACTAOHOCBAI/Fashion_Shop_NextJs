"use client";

import Image from "next/image";
import ProductCard from "./ProductCard";

interface ChatMessageBubbleProps {
  message: BotMessage;
  isUser: boolean;
}

export default function ChatMessageBubble({
  message,
  isUser,
}: ChatMessageBubbleProps) {
  const hasImage = message.metadata?.hasImage && message.metadata?.imageUrl;
  const hasAudio = message.metadata?.hasAudio && message.metadata?.audioUrl;
  const products = message.products || message.metadata?.products || [];

  return (
    <div className={`max-w-[75%] space-y-2`}>
      {/* Text Content */}
      <div
        className={`rounded-2xl px-4 py-2 text-sm leading-relaxed ${
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        }`}
      >
        {message.content}
      </div>

      {/* Image Attachment (User Upload Only) */}
      {isUser && hasImage && message.metadata?.imageUrl && (
        <div className="relative w-48 h-48 rounded-lg overflow-hidden border">
          <Image
            src={message.metadata.imageUrl}
            alt="Uploaded image"
            fill
            className="object-cover"
            sizes="192px"
          />
        </div>
      )}

      {/* Audio Attachment (User Upload Only) */}
      {isUser && hasAudio && message.metadata?.audioUrl && (
        <div className="bg-muted/50 rounded-lg p-2">
          <audio
            src={message.metadata.audioUrl}
            controls
            className="w-full max-w-xs"
          />
        </div>
      )}

      {/* Product Results (Bot Response) */}
      {!isUser && products.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {products.slice(0, 4).map((product: any, index: number) => {
            // Handle both formats from backend
            const productData = {
              id: product.id || product.product_id,
              name: product.name || `Product ${product.product_id}`,
              price: product.price || 0,
              image_url: product.image_url || "",
              category: product.category || "Unknown",
            };

            return <ProductCard key={index} product={productData} />;
          })}
        </div>
      )}
    </div>
  );
}
