"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { X, ImagePlus, Tag, Send, Loader2, Search } from "lucide-react";
import { useCreatePost } from "@/hooks/queries/usePost";
import { useProducts } from "@/hooks/queries/useProduct";
import { toast } from "sonner";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser?: User;
}

const CreatePostModal = ({
  isOpen,
  onClose,
  currentUser,
}: CreatePostModalProps) => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createPost, isPending } = useCreatePost();

  // Search products
  const { data: productResults } = useProducts({
    page: 1,
    limit: 10,
    search: productSearchQuery,
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files].slice(0, 5); // Max 5 images

    setImages(newImages);

    // Create previews
    const previews = newImages.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setImages(newImages);
    setImagePreviews(newPreviews);

    // Revoke URL to prevent memory leak
    URL.revokeObjectURL(imagePreviews[index]);
  };

  const handleSelectProduct = (product: Product) => {
    if (selectedProducts.find((p) => p.id === product.id)) {
      // Remove if already selected
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      // Add if not selected (max 10)
      if (selectedProducts.length < 10) {
        setSelectedProducts([...selectedProducts, product]);
      }
    }
  };

  const handleSubmit = () => {
    if (!content.trim()) {
      toast.error("Please enter some content");
      return;
    }

    const productIds = selectedProducts.map((p) => p.id);

    createPost(
      {
        content: content.trim(),
        productIds: productIds.length > 0 ? productIds : undefined,
        images: images.length > 0 ? images : undefined,
      },
      {
        onSuccess: () => {
          // Reset form
          setContent("");
          setImages([]);
          setImagePreviews([]);
          setSelectedProducts([]);
          setShowProductSearch(false);
          setProductSearchQuery("");
          onClose();
        },
        onError: (error: any) => {
          toast.success(error?.message || "Failed to create post");
        },
      }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-[20px]">
      <div className="bg-white rounded-[20px] w-full max-w-[600px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[10px] border-b border-gray-200 sticky top-0 bg-white rounded-t-[20px]">
          <h6 className="text-[16px] font-bold">Create Post</h6>
          <button
            onClick={onClose}
            className="p-[8px] hover:bg-gray-100 rounded-full transition-all duration-200"
          >
            <X className="w-[24px] h-[24px]" />
          </button>
        </div>

        {/* Body */}
        <div className="p-[24px]">
          {/* User Info */}
          {currentUser && (
            <div className="flex items-center gap-[12px] mb-[20px]">
              <div className="w-[48px] h-[48px] rounded-full overflow-hidden bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] flex items-center justify-center">
                {currentUser.avatar ? (
                  <Image
                    src={currentUser.avatar}
                    alt={currentUser.fullName}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                ) : (
                  <span className="text-white font-semibold text-[18px]">
                    {currentUser.fullName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="font-semibold text-[16px]">
                  {currentUser.fullName}
                </p>
              </div>
            </div>
          )}

          {/* Content Textarea */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full min-h-[120px] p-[16px] border border-gray-200 rounded-[12px] resize-none focus:outline-none focus:border-[#40BFFF] transition-all duration-200 text-[16px]"
          />

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="mt-[16px] grid grid-cols-3 gap-[12px]">
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-[12px] overflow-hidden bg-gray-100"
                >
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-[8px] right-[8px] p-[6px] bg-white rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                  >
                    <X className="w-[16px] h-[16px]" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Selected Products */}
          {selectedProducts.length > 0 && (
            <div className="mt-[16px]">
              <div className="flex items-center gap-[8px] mb-[12px] text-[14px] text-gray-600">
                <Tag className="w-[16px] h-[16px]" />
                <span className="font-medium">
                  Tagged Products ({selectedProducts.length}/10)
                </span>
              </div>
              <div className="flex flex-wrap gap-[8px]">
                {selectedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-[8px] bg-[#40BFFF]/10 text-[#40BFFF] px-[12px] py-[6px] rounded-full text-[14px] font-medium"
                  >
                    <span>{product.name}</span>
                    <button
                      onClick={() =>
                        setSelectedProducts(
                          selectedProducts.filter((p) => p.id !== product.id)
                        )
                      }
                      className="hover:bg-[#40BFFF]/20 rounded-full p-[2px] transition-all duration-200"
                    >
                      <X className="w-[14px] h-[14px]" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Search */}
          {showProductSearch && (
            <div className="mt-[16px] border border-gray-200 rounded-[12px] p-[16px]">
              <div className="flex items-center gap-[12px] mb-[12px]">
                <Search className="w-[20px] h-[20px] text-gray-400" />
                <input
                  type="text"
                  value={productSearchQuery}
                  onChange={(e) => setProductSearchQuery(e.target.value)}
                  placeholder="Search products to tag..."
                  className="flex-1 outline-none text-[14px]"
                />
              </div>

              {productSearchQuery && productResults?.data && (
                <div className="max-h-[200px] overflow-y-auto space-y-[8px]">
                  {productResults.data.map((product) => {
                    const isSelected = selectedProducts.find(
                      (p) => p.id === product.id
                    );
                    return (
                      <button
                        key={product.id}
                        onClick={() => handleSelectProduct(product)}
                        className={`w-full flex items-center gap-[12px] p-[12px] rounded-[8px] transition-all duration-200 ${
                          isSelected
                            ? "bg-[#40BFFF]/10 border-2 border-[#40BFFF]"
                            : "hover:bg-gray-50 border-2 border-transparent"
                        }`}
                      >
                        {product.images && product.images[0] && (
                          <div className="w-[40px] h-[40px] rounded-[6px] overflow-hidden bg-gray-100 flex-shrink-0">
                            <Image
                              src={product.images[0].imageUrl}
                              alt={product.name}
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 text-left">
                          <p className="text-[14px] font-medium line-clamp-1">
                            {product.name}
                          </p>
                          <p className="text-[14px] text-[#40BFFF] font-semibold">
                            ${product.price}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-[20px] flex gap-[12px]">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={images.length >= 5}
              className="flex-1 flex items-center justify-center gap-[8px] py-[12px] border-2 border-gray-200 rounded-[12px] hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ImagePlus className="w-[20px] h-[20px] text-[#40BFFF]" />
              <span className="text-[14px] font-medium">
                Add Photos ({images.length}/5)
              </span>
            </button>

            <button
              onClick={() => setShowProductSearch(!showProductSearch)}
              disabled={selectedProducts.length >= 10}
              className="flex-1 flex items-center justify-center gap-[8px] py-[12px] border-2 border-gray-200 rounded-[12px] hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Tag className="w-[20px] h-[20px] text-[#FFD470]" />
              <span className="text-[14px] font-medium">Tag Products</span>
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>

        {/* Footer */}
        <div className="p-[24px] border-t border-gray-200 flex justify-end gap-[12px]">
          <button
            onClick={onClose}
            disabled={isPending}
            className="text-[16px] px-[24px] py-[10px] border-2 border-gray-200 rounded-[12px] font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending || !content.trim()}
            className="px-[24px] py-[10px] bg-[#40BFFF] text-white rounded-[12px] font-medium hover:bg-[#3AADEB] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-[8px]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-[18px] h-[18px] animate-spin" />
                <span className="text-[16px]">Posting...</span>
              </>
            ) : (
              <>
                <Send className="w-[18px] h-[18px]" />
                <span className="text-[16px]">Post</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
