"use client";

import {
  Camera,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Star,
  Quote,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ProductCard from "@/app/client/products/_components/ProductCard";
import { useProducts } from "@/hooks/queries/useProduct";
import { useFeaturedReviews, useHomeStatistics } from "@/hooks/queries/useHome";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageSearchModal from "@/app/client/_components/ImageSearchModal";
import ImageSearchModal2 from "@/app/client/_components/ImageSearchModal2";
import { ProductListSkeleton } from "@/components/ui/skeleton-variants";
import {
  staggerContainer,
  staggerItem,
  float,
  buttonHover,
} from "@/lib/animations";
import { cn } from "@/lib/utils";

const HomePage = () => {
  const { data: statistics } = useHomeStatistics();

  const { data: reviews } = useFeaturedReviews();
  // Fetch new arrivals (latest 8 products)
  const { data: newProducts, isLoading: productsLoading } = useProducts({
    page: 1,
    limit: 8,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });

  const handleChatbotClick = () => {
    // Try to find and click the chatbot button in the DOM
    const chatbotButton = document.querySelector(
      'button[class*="fixed"][class*="bottom"]'
    );
    if (chatbotButton) {
      (chatbotButton as HTMLButtonElement).click();
    }
  };

  const scrollToAIFeatures = () => {
    const aiSection = document.getElementById("ai-features");
    if (aiSection) {
      aiSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      {/* SECTION 1: HERO BANNER */}
      <section className="relative overflow-hidden bg-gradient-hero py-24">
        {/* Animated background elements */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-[var(--cyan-200)] dark:bg-[var(--cyan-800)] rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-[var(--yellow-200)] dark:bg-[var(--yellow-800)] rounded-full blur-3xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="w-[1240px] mx-auto flex items-center justify-between gap-16 relative z-10">
          {/* Left: Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full mb-6 border border-gray-200 dark:border-gray-700"
            >
              <Sparkles className="w-4 h-4 text-[var(--cyan-500)]" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                AI-Powered Fashion Discovery
              </span>
            </motion.div>

            <h1 className="text-6xl font-bold leading-tight">
              Discover Fashion
              <br />
              <span className="text-gradient-vibrant">Powered by AI</span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mt-6 max-w-[500px] leading-relaxed">
              Experience smart shopping with AI-powered image search and
              personalized recommendations. Find your perfect style effortlessly.
            </p>

            <div className="flex gap-6 mt-10">
              <Link href="/client/products/men">
                <motion.button
                  className="px-10 py-4 bg-gradient-primary text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
                  variants={buttonHover}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                >
                  Shop Now
                </motion.button>
              </Link>

              <motion.button
                onClick={scrollToAIFeatures}
                className="px-8 py-4 border-2 border-[var(--cyan-400)] dark:border-[var(--cyan-500)] text-[var(--cyan-500)] dark:text-[var(--cyan-400)] rounded-xl font-semibold hover:bg-[var(--cyan-400)] dark:hover:bg-[var(--cyan-500)] hover:text-white transition-all duration-300 text-lg"
                variants={buttonHover}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                Explore AI Features
              </motion.button>
            </div>

            {/* Trust badges with animations */}
            <motion.div
              className="flex gap-12 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <StatBadge
                value={statistics?.totalProducts || 0}
                label="Products"
                gradient="from-[var(--cyan-400)] to-[var(--cyan-600)]"
              />
              <StatBadge
                value={statistics?.totalCustomers || 0}
                label="Happy Customers"
                gradient="from-[var(--yellow-400)] to-[var(--yellow-600)]"
              />
              <StatBadge
                value={statistics?.rating.averageRating || 0}
                label="Average Rating"
                gradient="from-green-400 to-green-600"
                decimals={1}
              />
            </motion.div>
          </motion.div>

          {/* Right: Hero Visual */}
          <motion.div
            className="relative w-[500px] h-[500px]"
            initial={{ opacity: 0, x: 50, rotate: -5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[var(--cyan-400)]/30 to-[var(--yellow-400)]/30 rounded-3xl blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
              <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl flex items-center justify-center overflow-hidden">
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-32 h-32 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center shadow-xl"
                    animate={{
                      boxShadow: [
                        "0 10px 30px rgba(64,191,255,0.3)",
                        "0 20px 50px rgba(64,191,255,0.5)",
                        "0 10px 30px rgba(64,191,255,0.3)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Camera className="w-16 h-16 text-white" />
                  </motion.div>
                  <p className="text-gray-800 dark:text-gray-200 font-bold text-2xl mb-2">
                    AI-Powered Shopping
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-base">
                    Upload images to find products
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: AI FEATURES SHOWCASE */}
      <section id="ai-features" className="py-[80px] bg-white">
        <div className="w-[1240px] mx-auto">
          <div className="text-center mb-[60px]">
            <h2 className="text-[42px] font-bold">
              Smart Shopping with <span className="text-[#40BFFF]">AI</span>
            </h2>
            <p className="text-[20px] text-gray-600 mt-[16px]">
              Discover fashion faster with our intelligent features
            </p>
          </div>

          <div className="grid grid-cols-2 gap-[40px]">
            {/* Feature 1: Image Search */}
            <div
              className="group relative bg-gradient-to-br from-[#40BFFF]/5 to-[#40BFFF]/10
                          rounded-[20px] p-[40px] border-2 border-transparent
                          hover:border-[#40BFFF] transition-all duration-300
                          hover:shadow-xl hover:-translate-y-2"
            >
              {/* Icon */}
              <div
                className="w-[80px] h-[80px] bg-white rounded-full flex items-center
                            justify-center shadow-lg mb-[30px] group-hover:scale-110
                            transition-transform duration-300"
              >
                <Camera className="w-[40px] h-[40px] text-[#40BFFF]" />
              </div>

              <h3 className="text-[28px] font-semibold mb-[16px]">
                AI Image Search
              </h3>

              <p className="text-[18px] text-gray-600 mb-[30px] leading-relaxed">
                Upload any fashion image and let our AI find similar products
                instantly. No more endless scrolling - just upload and discover.
              </p>

              <div className="flex flex-col gap-[12px] mb-[30px]">
                <div className="flex items-center gap-[12px]">
                  <CheckCircle2 className="w-[20px] h-[20px] text-[#40BFFF]" />
                  <span className="text-[16px]">Instant visual matching</span>
                </div>
                <div className="flex items-center gap-[12px]">
                  <CheckCircle2 className="w-[20px] h-[20px] text-[#40BFFF]" />
                  <span className="text-[16px]">
                    Find similar styles effortlessly
                  </span>
                </div>
                <div className="flex items-center gap-[12px]">
                  <CheckCircle2 className="w-[20px] h-[20px] text-[#40BFFF]" />
                  <span className="text-[16px]">
                    Smart recommendation engine
                  </span>
                </div>
              </div>
              <ImageSearchModal2 />
              {/* <button
                onClick={handleImageSearchClick}
                className="px-[24px] py-[12px] bg-[#40BFFF] text-white rounded-[4px]
                           font-medium hover:bg-[#3AADEB] transition-all duration-200
                           active:scale-95 flex items-center gap-[10px]"
              >
                <Camera className="w-[18px] h-[18px]" />
                Try Image Search
              </button> */}
            </div>

            {/* Feature 2: AI Chatbot */}
            <div
              className="group relative bg-gradient-to-br from-[#FFD470]/5 to-[#FFD470]/10
                          rounded-[20px] p-[40px] border-2 border-transparent
                          hover:border-[#FFD470] transition-all duration-300
                          hover:shadow-xl hover:-translate-y-2"
            >
              <div
                className="w-[80px] h-[80px] bg-white rounded-full flex items-center
                            justify-center shadow-lg mb-[30px] group-hover:scale-110
                            transition-transform duration-300"
              >
                <MessageCircle className="w-[40px] h-[40px] text-[#FFD470]" />
              </div>

              <h3 className="text-[28px] font-semibold mb-[16px]">
                AI Shopping Assistant
              </h3>

              <p className="text-[18px] text-gray-600 mb-[30px] leading-relaxed">
                Get instant help from our AI chatbot. Ask questions, get style
                advice, and find the perfect items for your needs.
              </p>

              <div className="flex flex-col gap-[12px] mb-[30px]">
                <div className="flex items-center gap-[12px]">
                  <CheckCircle2 className="w-[20px] h-[20px] text-[#FFD470]" />
                  <span className="text-[16px]">24/7 instant support</span>
                </div>
                <div className="flex items-center gap-[12px]">
                  <CheckCircle2 className="w-[20px] h-[20px] text-[#FFD470]" />
                  <span className="text-[16px]">
                    Personalized recommendations
                  </span>
                </div>
                <div className="flex items-center gap-[12px]">
                  <CheckCircle2 className="w-[20px] h-[20px] text-[#FFD470]" />
                  <span className="text-[16px]">Style guidance & tips</span>
                </div>
              </div>

              <button
                onClick={handleChatbotClick}
                className="px-[24px] py-[12px] bg-[#FFD470] text-gray-800 rounded-[4px]
                           font-medium hover:bg-[#FFC940] transition-all duration-200
                           active:scale-95 flex items-center gap-[10px]"
              >
                <MessageCircle className="w-[18px] h-[18px]" />
                Chat with AI
              </button>
            </div>
          </div>

          {/* Demo section */}
          <div className="mt-[60px] bg-[#F6F7F8] rounded-[20px] p-[40px]">
            <p className="text-center text-[18px] text-gray-700">
              <span className="font-semibold">Pro Tip:</span> Take a photo of
              any outfit you like, upload it, and we&apos;ll find similar items
              in our collection!
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED PRODUCTS / NEW ARRIVALS */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="w-[1240px] mx-auto">
          <motion.div
            className="flex justify-between items-end mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <h2 className="text-5xl font-bold dark:text-white">New Arrivals</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mt-3">
                Fresh styles just added to our collection
              </p>
            </div>
          </motion.div>

          {productsLoading ? (
            <ProductListSkeleton count={8} columns={4} />
          ) : newProducts?.data && newProducts.data.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {newProducts.data.slice(0, 8).map((product: Product, index: number) => (
                <motion.div key={product.id} variants={staggerItem} custom={index}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-24">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                No new arrivals at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 4: CUSTOMER REVIEWS */}
      <section className="py-[80px] bg-white">
        <div className="w-[1240px] mx-auto">
          {/* Customer Reviews / Testimonials */}
          <div className="mt-[60px]">
            <div className="text-center mb-[40px]">
              <h3 className="text-[36px] font-bold">What Our Customers Say</h3>
              <p className="text-[18px] text-gray-600 mt-[12px]">
                Real experiences from our happy shoppers
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {reviews?.map((review) => (
                <Review item={review} key={review.id} />
              ))}
            </div>

            {/* Trust Badge */}
            <div className="mt-[40px] text-center bg-[#F6F7F8] rounded-[16px] p-[24px]">
              <p className="text-[16px] text-gray-700">
                <span className="font-semibold text-[#40BFFF]">
                  {statistics?.rating.averageRating}/5
                </span>{" "}
                average rating from{" "}
                <span className="font-semibold">
                  {statistics?.rating.totalRating} reviews
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
const getInitials = (fullName?: string) => {
  if (!fullName) return "?";

  return fullName
    .trim()
    .split(/\s+/) // tách theo khoảng trắng
    .map((word) => word[0]?.toUpperCase())
    .join("")
    .slice(0, 3); // tối đa 3 ký tự (đẹp UI)
};

const Review = ({ item }: { item: Review }) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 border-2 border-gray-100 dark:border-gray-700 hover:border-[var(--cyan-400)] dark:hover:border-[var(--cyan-500)] transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center gap-1 mb-5">
        {Array.from({ length: item.rating }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </motion.div>
        ))}
      </div>

      <Quote className="w-8 h-8 text-[var(--cyan-400)]/30 dark:text-[var(--cyan-500)]/30 mb-4" />

      <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        {item.comment}
      </p>

      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 rounded-full border-2 border-gray-200 dark:border-gray-600">
          <AvatarImage
            className="object-cover rounded-full"
            src={item.user.avatar}
            alt={item.user.fullName}
          />
          <AvatarFallback className="rounded-full bg-gradient-primary text-white">
            {getInitials(item.user.fullName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-base dark:text-white">{item.user.fullName}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Verified Customer</p>
        </div>
      </div>
    </motion.div>
  );
};

// StatBadge Component
const StatBadge = ({
  value,
  label,
  gradient,
  decimals = 0,
}: {
  value: number;
  label: string;
  gradient: string;
  decimals?: number;
}) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
      <p className={cn("text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent", gradient)}>
        {value.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
      </p>
      <p className="text-gray-600 dark:text-gray-400 mt-1">{label}</p>
    </motion.div>
  );
};

export default HomePage;
