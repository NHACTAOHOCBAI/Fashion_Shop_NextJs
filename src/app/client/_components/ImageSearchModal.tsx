"use client";

import { useState } from "react";
import { Camera, X, Image as ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useSearchImage } from "@/hooks/queries/useProduct";
import { BaseModal } from "@/components/modals/BaseModal";
import { ProductSearchResultItem } from "@/app/client/_components/ProductSearchResultItem";
import { motion, AnimatePresence } from "framer-motion";

interface ImageSearchModalProps {
  variant?: "icon" | "button";
}

export default function ImageSearchModal({ variant = "icon" }: ImageSearchModalProps) {
  const [searchKey, setSearchKey] = useState(0);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const { data: products, isLoading } = useSearchImage(file, searchKey);
  const [preview, setPreview] = useState<string | null>(null);

  const handleSelectImage = (file: File) => {
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setSearchKey((k) => k + 1);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Clean up preview URL when closing
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
    setFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleSelectImage(f);
    e.currentTarget.value = "";
  };

  return (
    <>
      {/* CAMERA BUTTON */}
      {variant === "icon" ? (
        <Button
          variant="outline"
          size="icon"
          className="relative mx-[10px] hover:border-[#40BFFF] hover:text-[#40BFFF] transition-colors"
          onClick={() => document.getElementById("image-input")?.click()}
        >
          <Camera className="h-5 w-5" />
        </Button>
      ) : (
        <button
          onClick={() => document.getElementById("image-input")?.click()}
          className="px-6 py-3 bg-[#40BFFF] text-white rounded-lg font-medium hover:bg-[#3AADEB] transition-all duration-200 active:scale-95 flex items-center gap-2.5 shadow-sm hover:shadow-md"
        >
          <Camera className="w-5 h-5" />
          Try Image Search
        </button>
      )}

      <Input
        id="image-input"
        type="file"
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />

      {/* MODAL */}
      <BaseModal
        open={open}
        onOpenChange={handleClose}
        title="Image Search"
        description={
          products
            ? `Found ${products.length} similar product${products.length !== 1 ? "s" : ""}`
            : "Upload an image to find similar products"
        }
        icon={<ImageIcon size={20} />}
        maxWidth="max-w-3xl"
      >
        <div className="space-y-6">
          {/* IMAGE PREVIEW */}
          <AnimatePresence mode="wait">
            {preview && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="rounded-lg bg-gradient-to-r from-[#40BFFF]/5 to-transparent border border-[#40BFFF]/20 p-6 flex flex-col items-center"
              >
                <div className="relative group">
                  <Image
                    src={preview}
                    alt="preview"
                    width={300}
                    height={300}
                    className="w-[300px] h-[300px] object-contain rounded-lg shadow-md"
                  />

                  {/* Remove Image Button */}
                  <button
                    onClick={() => {
                      URL.revokeObjectURL(preview);
                      setPreview(null);
                      setFile(null);
                      setSearchKey(0);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <Upload className="w-4 h-4 text-[#40BFFF]" />
                  <span>Searching for similar products...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* UPLOAD AREA (when no preview) */}
          {!preview && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-12 flex flex-col items-center justify-center text-center hover:border-[#40BFFF] hover:bg-[#40BFFF]/5 transition-all cursor-pointer"
              onClick={() => document.getElementById("image-input")?.click()}
            >
              <div className="w-16 h-16 rounded-full bg-[#40BFFF]/10 flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-[#40BFFF]" />
              </div>
              <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
                Upload an image
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Click to browse or drag and drop an image
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Supported formats: JPG, PNG, WEBP
              </p>
            </motion.div>
          )}

          {/* RESULTS */}
          <div>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 rounded-full border-4 border-[#40BFFF]/20 border-t-[#40BFFF]"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Analyzing your image...
                </p>
              </div>
            ) : products && products.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                  <Camera className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
                  No similar products found
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Try uploading a different image
                </p>
              </motion.div>
            ) : products && products.length > 0 ? (
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Similar Products ({products.length})
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
