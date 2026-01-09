"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateLivestream } from "@/hooks/queries/useLivestream";
import { useProducts } from "@/hooks/queries/useProduct";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Upload, Loader2, Info, Package, X, Search, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

export default function CreateLivestreamPage() {
  const router = useRouter();
  const createMutation = useCreateLivestream();
  const [productSearch, setProductSearch] = useState("");
  const { data: productsData, isLoading: loadingProducts } = useProducts({ search: productSearch, limit: 50 });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    scheduledAt: "",
    productIds: [] as number[],
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size must be less than 5MB");
        return;
      }

      setThumbnailFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter a title for the livestream.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title.trim());

      if (formData.description.trim()) {
        formDataToSend.append("description", formData.description.trim());
      }

      if (formData.scheduledAt) {
        formDataToSend.append("scheduledAt", new Date(formData.scheduledAt).toISOString());
      }

      if (thumbnailFile) {
        formDataToSend.append("thumbnail", thumbnailFile);
      }

      if (formData.productIds.length > 0) {
        // Send as JSON string - backend will parse it
        formDataToSend.append("productIds", JSON.stringify(formData.productIds));
      }

      const result = await createMutation.mutateAsync(formDataToSend);
      toast.success("Livestream created successfully!");
      router.push(`/admin/livestreams/view-livestreams`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <Link href="/admin/livestreams/view-livestreams">
          <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold transition-colors mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Livestreams
          </button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Create New Livestream
          </h1>
          <p className="text-muted-foreground">
            Fill in the information to create your livestream session
          </p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border rounded-xl shadow p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter livestream title..."
              className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              required
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.title.length}/200 characters
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your livestream session..."
              rows={4}
              className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
              maxLength={1000}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {formData.description.length}/1000 characters
            </p>
          </div>

          {/* Scheduled At */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Scheduled At
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="datetime-local"
                name="scheduledAt"
                value={formData.scheduledAt}
                onChange={handleChange}
                min={new Date().toISOString().slice(0, 16)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Leave empty if you want to start immediately
            </p>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              <ImageIcon className="w-4 h-4 inline-block mr-1" />
              Thumbnail Image
            </label>
            
            {!thumbnailPreview ? (
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG or WEBP (Max 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                />
              </label>
            ) : (
              <div className="relative">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleRemoveThumbnail}
                  className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-xs text-muted-foreground mt-2">
                  {thumbnailFile?.name} ({(thumbnailFile!.size / 1024).toFixed(1)} KB)
                </p>
              </div>
            )}
          </div>

          {/* Products */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              <Package className="w-4 h-4 inline-block mr-1" />
              Products to Feature
            </label>
            
            {/* Search products */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products by name..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>

            {/* Selected products chips */}
            {formData.productIds.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                {formData.productIds.map((productId) => {
                  const product = productsData?.data.find((p: any) => p.id === productId);
                  if (!product) return null;
                  return (
                    <div
                      key={productId}
                      className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full border shadow-sm"
                    >
                      <Image
                        src={product.thumbnail || product.images?.[0]?.imageUrl || "/placeholder.png"}
                        alt={product.name}
                        width={24}
                        height={24}
                        className="rounded-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.png";
                        }}
                      />
                      <span className="text-sm font-medium">{product.name}</span>
                      <button
                        type="button"
                        onClick={() => setFormData({
                          ...formData,
                          productIds: formData.productIds.filter((id) => id !== productId),
                        })}
                        className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Products list */}
            <div className="max-h-[300px] overflow-y-auto border rounded-lg">
              {loadingProducts ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              ) : productsData?.data && productsData.data.length > 0 ? (
                <div className="divide-y">
                  {productsData.data.map((product: any) => (
                    <label
                      key={product.id}
                      className="flex items-center gap-3 p-3 hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.productIds.includes(product.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              productIds: [...formData.productIds, product.id],
                            });
                          } else {
                            setFormData({
                              ...formData,
                              productIds: formData.productIds.filter((id) => id !== product.id),
                            });
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-2 focus:ring-ring"
                      />
                      <Image
                        src={product.thumbnail || product.images?.[0]?.imageUrl || "/placeholder.png"}
                        alt={product.name}
                        width={50}
                        height={50}
                        className="rounded-lg object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.png";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price)}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No products found</p>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {formData.productIds.length} product{formData.productIds.length !== 1 ? 's' : ''} selected
            </p>
          </div>

          {/* Info box */}
          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-semibold mb-2">Streaming Guide:</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700 dark:text-blue-400">
                  <li>
                    After creating the livestream, you will receive a <strong>Stream Key</strong>
                  </li>
                  <li>
                    Use OBS Studio or other streaming software
                  </li>
                  <li>
                    <strong>RTMP URL:</strong> rtmp://localhost:1935/live
                  </li>
                  <li>
                    Paste the Stream Key into your streaming software to start broadcasting
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex items-center gap-3 pt-4">
            <motion.button
              type="submit"
              disabled={createMutation.isPending || !formData.title.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Livestream"
              )}
            </motion.button>

            <Link href="/admin/livestreams/view-livestreams" className="flex-1">
              <button
                type="button"
                className="w-full px-6 py-3 bg-muted hover:bg-muted/80 rounded-lg font-semibold transition-all"
              >
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
