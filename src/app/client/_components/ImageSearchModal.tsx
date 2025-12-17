"use client";

import { useState } from "react";
import { Camera, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useSearchImage } from "@/hooks/queries/useProduct";
import Link from "next/link";
import Loading2 from "@/app/client/_components/Loading2";

export default function ImageSearchModal() {
  const [searchKey, setSearchKey] = useState(0);

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { data: products, isLoading } = useSearchImage(file, searchKey);

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSelectImage = (file: File) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setSearchKey((k) => k + 1); // 🔥 TRIGGER FETCH
    setOpen(true);
  };
  return (
    <>
      {/* CAMERA BUTTON */}
      <Button
        variant="outline"
        size="icon"
        className="relative mx-[10px]"
        onClick={() => document.getElementById("image-input")?.click()}
      >
        <Camera className="h-5 w-5" />
        <Input
          id="image-input"
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleSelectImage(f);

            // 🔥 QUAN TRỌNG: reset input
            e.currentTarget.value = "";
          }}
        />
      </Button>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
          <DialogHeader className="shrink-0">
            <DialogTitle>Search by image</DialogTitle>
          </DialogHeader>

          {/* SCROLL AREA */}
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="flex flex-col gap-6">
              {/* IMAGE PREVIEW */}
              {preview && (
                <div className="rounded-lg border p-4 flex flex-col items-center">
                  <Image
                    src={preview}
                    alt="preview"
                    width={300}
                    height={300}
                    className="w-[300px] h-[300px] object-contain"
                  />
                  <p className="text-sm text-muted-foreground mt-3">
                    Showing results based on your image
                  </p>
                </div>
              )}

              {/* RESULTS */}
              <div>
                {loading ? (
                  <Loading2 />
                ) : products?.length === 0 ? (
                  <p className="text-center text-muted-foreground">
                    No similar products found
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {products?.map((product) => (
                      <ImageSearchResultItem
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
function ImageSearchResultItem({ product }: { product: Product }) {
  const imageUrl = product.images?.[0]?.imageUrl || "/placeholder.png";

  return (
    <Link
      href={`/client/products/product-detail/${product.id}`}
      className="flex gap-4 p-3 border rounded-xl hover:shadow transition cursor-pointer"
    >
      {/* IMAGE */}
      <Image
        src={imageUrl}
        alt={product.name}
        width={120}
        height={120}
        className="w-[120px] h-[120px] object-cover rounded-lg bg-muted"
      />

      {/* CONTENT */}
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
