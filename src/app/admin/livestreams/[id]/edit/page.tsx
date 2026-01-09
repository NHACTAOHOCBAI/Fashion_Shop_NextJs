"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetLivestream, useUpdateLivestream } from "@/hooks/queries/useLivestream";
import { useProducts } from "@/hooks/queries/useProduct";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Upload, Loader2, Info, AlertCircle, Package, X, Search, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { LivestreamStatus } from "@/interfaces/livestream";

export default function EditLivestreamPage() {
  const params = useParams();
  const router = useRouter();
  const livestreamId = parseInt(params.id as string, 10);
  
  const { data: livestream, isLoading } = useGetLivestream(livestreamId);
  const updateMutation = useUpdateLivestream();
  const [productSearch, setProductSearch] = useState("");
  const { data: productsData, isLoading: loadingProducts } = useProducts({ search: productSearch, limit: 50 });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    scheduledAt: "",
    productIds: [] as number[],
    thumbnailUrl: "",
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [currentThumbnailUrl, setCurrentThumbnailUrl] = useState<string>("");

  useEffect(() => {
    if (livestream) {
      setFormData({
        title: livestream.title || "",
        description: livestream.description || "",
        scheduledAt: livestream.scheduledAt 
          ? new Date(livestream.scheduledAt).toISOString().slice(0, 16)
          : "",
        productIds: livestream.products?.map((p: any) => p.id) || [],
        thumbnailUrl: livestream.thumbnailUrl || "",
      });
      setCurrentThumbnailUrl(livestream.thumbnailUrl || "");
    }
  }, [livestream]);

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
    setCurrentThumbnailUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Please enter a title for the livestream.");
      return;
    }

    const isLive = livestream?.status === LivestreamStatus.Live;
    const canEditBasicInfo = livestream?.status === LivestreamStatus.Scheduled || 
                             livestream?.status === LivestreamStatus.Cancelled;

    try {
      // Use FormData if thumbnail file is present
      if (thumbnailFile) {
        const formDataToSend = new FormData();

        if (canEditBasicInfo) {
          formDataToSend.append("title", formData.title.trim());
          
          if (formData.description.trim()) {
            formDataToSend.append("description", formData.description.trim());
          }

          if (formData.scheduledAt) {
            formDataToSend.append("scheduledAt", new Date(formData.scheduledAt).toISOString());
          }
        }

        formDataToSend.append("thumbnail", thumbnailFile);

        if (formData.productIds.length > 0) {
          // Send as JSON string - backend will parse it
          formDataToSend.append("productIds", JSON.stringify(formData.productIds));
        } else if (isLive) {
          formDataToSend.append("productIds", JSON.stringify([]));
        }

        await updateMutation.mutateAsync({ id: livestreamId, dto: formDataToSend });
      } else {
        // Use regular JSON if no thumbnail file
        const dto: any = {};

        // Basic info can only be edited when not LIVE
        if (canEditBasicInfo) {
          dto.title = formData.title.trim();
          
          if (formData.description.trim()) {
            dto.description = formData.description.trim();
          }

          if (formData.scheduledAt) {
            dto.scheduledAt = new Date(formData.scheduledAt).toISOString();
          }
        }

        // Products can be edited even during LIVE
        if (formData.productIds.length > 0) {
          dto.productIds = formData.productIds;
        } else if (isLive) {
          dto.productIds = [];
        }

        await updateMutation.mutateAsync({ id: livestreamId, dto });
      }
      
      if (isLive) {
        toast.success("Products updated successfully! You can now pin them during the stream.");
        router.push(`/admin/livestreams/${livestreamId}/watch`);
      } else {
        toast.success("Livestream updated successfully!");
        router.push(`/admin/livestreams/view-livestreams`);
      }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading livestream...</p>
        </div>
      </div>
    );
  }

  if (!livestream) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-8xl mb-4">😞</div>
          <h2 className="text-3xl font-bold mb-2">Livestream not found</h2>
          <Link href="/admin/livestreams/view-livestreams">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-lg transition-all">
              Back to Livestreams
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const isLive = livestream.status === LivestreamStatus.Live;
  const canEditBasicInfo = livestream.status === LivestreamStatus.Scheduled || 
                           livestream.status === LivestreamStatus.Cancelled;
  const canEditProducts = livestream.status !== LivestreamStatus.Ended;

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
            Edit Livestream
          </h1>
          <p className="text-muted-foreground">
            Update your livestream information
          </p>
        </motion.div>
      </div>

      {/* Warning if LIVE or ENDED */}
      {isLive && (
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800 dark:text-blue-300">
              <p className="font-semibold mb-1">🔴 Livestream is LIVE</p>
              <p>
                You can only add/remove <strong>Products</strong> during the live stream.
                Title, description, and other settings are locked.
              </p>
            </div>
          </div>
        </div>
      )}
      {!canEditProducts && (
        <div className="bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-orange-800 dark:text-orange-300">
              <p className="font-semibold mb-1">Cannot edit this livestream</p>
              <p>This livestream has ended and cannot be edited.</p>
            </div>
          </div>
        </div>
      )}

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
              className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all disabled:opacity-50"
              required
              maxLength={200}
              disabled={!canEditBasicInfo}
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
              className="w-full px-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none disabled:opacity-50"
              maxLength={1000}
              disabled={!canEditBasicInfo}
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
                className="w-full pl-12 pr-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all disabled:opacity-50"
                disabled={!canEditBasicInfo}
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
            
            {!thumbnailPreview && !currentThumbnailUrl ? (
              <label className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg ${canEditBasicInfo ? 'cursor-pointer bg-muted/30 hover:bg-muted/50' : 'cursor-not-allowed bg-muted/10 opacity-50'} transition-colors`}>
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
                  disabled={!canEditBasicInfo}
                />
              </label>
            ) : (
              <div className="relative">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={thumbnailPreview || currentThumbnailUrl}
                    alt="Thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                {canEditBasicInfo && (
                  <button
                    type="button"
                    onClick={handleRemoveThumbnail}
                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                {thumbnailFile && (
                  <p className="text-xs text-muted-foreground mt-2">
                    New: {thumbnailFile.name} ({(thumbnailFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Products */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              <Package className="w-4 h-4 inline-block mr-1" />
              Products to Feature
              {isLive && (
                <span className="ml-2 text-xs font-normal text-green-600 dark:text-green-400">
                  ✅ Can be edited during LIVE
                </span>
              )}
            </label>
            
            {/* Search products */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products by name..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                disabled={!canEditProducts}
                className="w-full pl-12 pr-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all disabled:opacity-50"
              />
            </div>

            {/* Selected products chips */}
            {formData.productIds.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                {formData.productIds.map((productId) => {
                  const product = productsData?.data.find((p: any) => p.id === productId) || livestream?.products?.find((p: any) => p.id === productId);
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
                      {canEditProducts && (
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
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Products list */}
            {canEditProducts && (
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
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.originalPrice)}
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
            )}
            <p className="text-xs text-muted-foreground mt-2">
              {formData.productIds.length} product{formData.productIds.length !== 1 ? 's' : ''} selected
            </p>
            
            {/* Info box for LIVE stream */}
            {isLive && (
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-3">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-800 dark:text-green-300">
                    <p className="font-semibold mb-2">💡 How to Pin Products During Live Stream:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Add products here and click <strong>"Update Products"</strong></li>
                      <li>Products will be added to your livestream's product pool</li>
                      <li>Go to <strong>Watch & Manage</strong> page during the stream</li>
                      <li>You can then <strong>Pin/Unpin</strong> any of these products to viewers</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Thumbnail (URL)
            </label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="url"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full pl-12 pr-4 py-3 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-all disabled:opacity-50"
                disabled={!canEditBasicInfo}
              />
            </div>
            {formData.thumbnailUrl && (
              <div className="mt-3 relative aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={formData.thumbnailUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "";
                    toast.error("Invalid image URL");
                  }}
                />
              </div>
            )}
          </div>

          {/* Current Status */}
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm font-semibold mb-2">Current Status</p>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                livestream.status === LivestreamStatus.Live 
                  ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                  : livestream.status === LivestreamStatus.Scheduled
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : livestream.status === LivestreamStatus.Ended
                  ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"
              }`}>
                {livestream.status}
              </span>
              <span className="text-sm text-muted-foreground">
                Stream Key: <code className="text-xs bg-background px-2 py-1 rounded">{livestream.streamKey}</code>
              </span>
            </div>
          </div>

          {/* Submit buttons */}
          <div className="flex items-center gap-3 pt-4">
            <motion.button
              type="submit"
              disabled={updateMutation.isPending || !formData.title.trim() || !canEditProducts}
              whileHover={{ scale: canEditProducts ? 1.02 : 1 }}
              whileTap={{ scale: canEditProducts ? 0.98 : 1 }}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
            >
              {updateMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Updating...
                </>
              ) : isLive ? (
                "Update Products"
              ) : (
                "Update Livestream"
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
