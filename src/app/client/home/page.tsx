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
  Clock,
  BadgeCheck,
  Heart,
  HeadphonesIcon,
  Truck,
  Shield,
  Package,
  Users,
  Award,
  TrendingUp,
  Target,
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
              personalized recommendations. Find your perfect style
              effortlessly.
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
      <div className="min-h-screen">
        {/* HERO SECTION */}
        <section className="bg-gradient-to-br from-[#40BFFF]/10 via-white to-[#FFD470]/10 py-[100px]">
          <div className="w-[1240px] mx-auto text-center">
            <h1 className="text-[56px] font-bold leading-tight">
              About <span className="text-[#40BFFF]">FShop</span>
            </h1>
            <p className="text-[24px] text-gray-600 mt-[24px] max-w-[800px] mx-auto leading-relaxed">
              Revolutionizing online fashion shopping with AI-powered technology
              and personalized experiences
            </p>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-[40px] mt-[60px]">
              <div className="bg-white rounded-[16px] p-[30px] shadow-lg">
                <p className="text-[42px] font-bold text-[#40BFFF]">
                  {statistics?.totalProducts}
                </p>
                <p className="text-[16px] text-gray-600 mt-[8px]">
                  Products Available
                </p>
              </div>
              <div className="bg-white rounded-[16px] p-[30px] shadow-lg">
                <p className="text-[42px] font-bold text-[#40BFFF]">
                  {statistics?.totalCustomers}
                </p>
                <p className="text-[16px] text-gray-600 mt-[8px]">
                  Happy Customers
                </p>
              </div>
              <div className="bg-white rounded-[16px] p-[30px] shadow-lg">
                <p className="text-[42px] font-bold text-[#40BFFF]">{`${statistics?.satisfactionRate}%`}</p>
                <p className="text-[16px] text-gray-600 mt-[8px]">
                  Satisfaction Rate
                </p>
              </div>
              <div className="bg-white rounded-[16px] p-[30px] shadow-lg">
                <p className="text-[42px] font-bold text-[#40BFFF]">24/7</p>
                <p className="text-[16px] text-gray-600 mt-[8px]">
                  Customer Support
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OUR STORY */}
        <section className="py-[80px] bg-white">
          <div className="w-[1240px] mx-auto">
            <div className="grid grid-cols-2 gap-[60px] items-center">
              {/* Left: Content */}
              <div>
                <h2 className="text-[42px] font-bold mb-[24px]">Our Story</h2>
                <p className="text-[18px] text-gray-700 leading-relaxed mb-[20px]">
                  FShop was founded with a simple yet ambitious vision: to make
                  fashion shopping smarter, faster, and more personalized
                  through the power of artificial intelligence.
                </p>
                <p className="text-[18px] text-gray-700 leading-relaxed mb-[20px]">
                  We recognized that traditional online shopping often left
                  customers frustrated—endless scrolling, difficulty finding the
                  right style, and lack of personalized recommendations. That's
                  why we built FShop.
                </p>
                <p className="text-[18px] text-gray-700 leading-relaxed">
                  Today, we're proud to serve thousands of customers worldwide,
                  helping them discover fashion that matches their unique style
                  with cutting-edge AI image search and intelligent chatbot
                  assistance.
                </p>
              </div>

              {/* Right: Visual */}
              <div className="bg-gradient-to-br from-[#40BFFF]/10 to-[#FFD470]/10 rounded-[20px] p-[40px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#40BFFF]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#FFD470]/20 rounded-full blur-3xl" />
                <div className="relative bg-white rounded-[16px] p-[40px] shadow-xl">
                  <div className="text-center">
                    <Sparkles className="w-[80px] h-[80px] text-[#40BFFF] mx-auto mb-[20px]" />
                    <h3 className="text-[28px] font-bold mb-[12px]">
                      Innovation First
                    </h3>
                    <p className="text-[16px] text-gray-600 leading-relaxed">
                      Combining fashion expertise with cutting-edge AI
                      technology to deliver an unmatched shopping experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION & VISION */}
        <section className="py-[80px] bg-[#F6F7F8]">
          <div className="w-[1240px] mx-auto">
            <div className="grid grid-cols-2 gap-[40px]">
              {/* Mission */}
              <div className="bg-white rounded-[20px] p-[40px] border-2 border-transparent hover:border-[#40BFFF] transition-all duration-300 hover:shadow-xl">
                <div className="w-[80px] h-[80px] bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] rounded-full flex items-center justify-center mb-[24px]">
                  <Target className="w-[40px] h-[40px] text-white" />
                </div>
                <h3 className="text-[32px] font-bold mb-[16px]">Our Mission</h3>
                <p className="text-[18px] text-gray-700 leading-relaxed">
                  To empower every individual to express their unique style by
                  providing an intelligent, seamless, and delightful shopping
                  experience that saves time and inspires confidence.
                </p>
              </div>

              {/* Vision */}
              <div className="bg-white rounded-[20px] p-[40px] border-2 border-transparent hover:border-[#FFD470] transition-all duration-300 hover:shadow-xl">
                <div className="w-[80px] h-[80px] bg-gradient-to-br from-[#FFD470] to-[#FFC940] rounded-full flex items-center justify-center mb-[24px]">
                  <TrendingUp className="w-[40px] h-[40px] text-gray-800" />
                </div>
                <h3 className="text-[32px] font-bold mb-[16px]">Our Vision</h3>
                <p className="text-[18px] text-gray-700 leading-relaxed">
                  To become the world's leading AI-powered fashion platform
                  where technology and style converge, making personalized
                  fashion accessible to everyone, everywhere.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="py-[80px] bg-white">
          <div className="w-[1240px] mx-auto">
            <div className="text-center mb-[60px]">
              <h2 className="text-[42px] font-bold">Our Core Values</h2>
              <p className="text-[20px] text-gray-600 mt-[16px]">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-4 gap-[30px]">
              {/* Value 1 */}
              <div className="bg-[#F6F7F8] rounded-[16px] p-[30px] text-center hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <div className="w-[60px] h-[60px] bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] rounded-full flex items-center justify-center mx-auto mb-[20px] group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-[30px] h-[30px] text-white" />
                </div>
                <h4 className="text-[20px] font-semibold mb-[12px]">
                  Customer First
                </h4>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  Every decision we make prioritizes our customers' needs and
                  satisfaction
                </p>
              </div>

              {/* Value 2 */}
              <div className="bg-[#F6F7F8] rounded-[16px] p-[30px] text-center hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <div className="w-[60px] h-[60px] bg-gradient-to-br from-[#FFD470] to-[#FFC940] rounded-full flex items-center justify-center mx-auto mb-[20px] group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-[30px] h-[30px] text-gray-800" />
                </div>
                <h4 className="text-[20px] font-semibold mb-[12px]">
                  Innovation
                </h4>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  We constantly push boundaries with AI technology to deliver
                  cutting-edge solutions
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-[#F6F7F8] rounded-[16px] p-[30px] text-center hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <div className="w-[60px] h-[60px] bg-gradient-to-br from-[#FF4858] to-[#FF6B7A] rounded-full flex items-center justify-center mx-auto mb-[20px] group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-[30px] h-[30px] text-white" />
                </div>
                <h4 className="text-[20px] font-semibold mb-[12px]">
                  Integrity
                </h4>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  We operate with transparency, honesty, and ethical practices
                  in all interactions
                </p>
              </div>

              {/* Value 4 */}
              <div className="bg-[#F6F7F8] rounded-[16px] p-[30px] text-center hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <div className="w-[60px] h-[60px] bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] rounded-full flex items-center justify-center mx-auto mb-[20px] group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-[30px] h-[30px] text-white" />
                </div>
                <h4 className="text-[20px] font-semibold mb-[12px]">
                  Excellence
                </h4>
                <p className="text-[15px] text-gray-600 leading-relaxed">
                  We strive for exceptional quality in every product, service,
                  and interaction
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="py-[80px] bg-gradient-to-br from-[#40BFFF]/5 to-[#FFD470]/5">
          <div className="w-[1240px] mx-auto">
            <div className="text-center mb-[60px]">
              <h2 className="text-[42px] font-bold">Why Choose FShop?</h2>
              <p className="text-[20px] text-gray-600 mt-[16px]">
                Experience the future of online fashion shopping
              </p>
            </div>

            <div className="grid grid-cols-3 gap-[40px]">
              {/* Feature 1 */}
              <div className="bg-white rounded-[20px] p-[40px] shadow-lg">
                <div className="flex items-start gap-[20px]">
                  <div className="w-[60px] h-[60px] bg-[#40BFFF]/10 rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-[30px] h-[30px] text-[#40BFFF]" />
                  </div>
                  <div>
                    <h4 className="text-[22px] font-semibold mb-[12px]">
                      AI-Powered Search
                    </h4>
                    <p className="text-[16px] text-gray-600 leading-relaxed">
                      Upload any fashion image and instantly find similar styles
                      in our catalog
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-[20px] p-[40px] shadow-lg">
                <div className="flex items-start gap-[20px]">
                  <div className="w-[60px] h-[60px] bg-[#FFD470]/10 rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <Users className="w-[30px] h-[30px] text-[#FFD470]" />
                  </div>
                  <div>
                    <h4 className="text-[22px] font-semibold mb-[12px]">
                      Personal Stylist
                    </h4>
                    <p className="text-[16px] text-gray-600 leading-relaxed">
                      Get personalized recommendations from our AI chatbot
                      assistant 24/7
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-[20px] p-[40px] shadow-lg">
                <div className="flex items-start gap-[20px]">
                  <div className="w-[60px] h-[60px] bg-[#FF4858]/10 rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <Package className="w-[30px] h-[30px] text-[#FF4858]" />
                  </div>
                  <div>
                    <h4 className="text-[22px] font-semibold mb-[12px]">
                      Curated Collections
                    </h4>
                    <p className="text-[16px] text-gray-600 leading-relaxed">
                      Hand-picked fashion items from trusted brands worldwide
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-[20px] p-[40px] shadow-lg">
                <div className="flex items-start gap-[20px]">
                  <div className="w-[60px] h-[60px] bg-[#40BFFF]/10 rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <Truck className="w-[30px] h-[30px] text-[#40BFFF]" />
                  </div>
                  <div>
                    <h4 className="text-[22px] font-semibold mb-[12px]">
                      Fast Delivery
                    </h4>
                    <p className="text-[16px] text-gray-600 leading-relaxed">
                      Quick and reliable shipping to your doorstep with tracking
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="bg-white rounded-[20px] p-[40px] shadow-lg">
                <div className="flex items-start gap-[20px]">
                  <div className="w-[60px] h-[60px] bg-[#FFD470]/10 rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <Shield className="w-[30px] h-[30px] text-[#FFD470]" />
                  </div>
                  <div>
                    <h4 className="text-[22px] font-semibold mb-[12px]">
                      Secure Payment
                    </h4>
                    <p className="text-[16px] text-gray-600 leading-relaxed">
                      Shop with confidence using our encrypted payment system
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 6 */}
              <div className="bg-white rounded-[20px] p-[40px] shadow-lg">
                <div className="flex items-start gap-[20px]">
                  <div className="w-[60px] h-[60px] bg-[#FF4858]/10 rounded-[12px] flex items-center justify-center flex-shrink-0">
                    <HeadphonesIcon className="w-[30px] h-[30px] text-[#FF4858]" />
                  </div>
                  <div>
                    <h4 className="text-[22px] font-semibold mb-[12px]">
                      24/7 Support
                    </h4>
                    <p className="text-[16px] text-gray-600 leading-relaxed">
                      Our support team is always ready to help with any
                      questions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OUR COMMITMENT */}
        <section className="py-[80px] bg-white">
          <div className="w-[1240px] mx-auto">
            <div className="bg-gradient-to-r from-[#40BFFF] to-[#5ECCFF] rounded-[24px] p-[60px] text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-3xl" />

              <div className="relative z-10 text-center max-w-[900px] mx-auto">
                <BadgeCheck className="w-[80px] h-[80px] mx-auto mb-[24px]" />
                <h2 className="text-[42px] font-bold mb-[24px]">
                  Our Commitment to You
                </h2>
                <p className="text-[20px] leading-relaxed mb-[32px]">
                  We're committed to providing not just products, but an
                  exceptional shopping experience. Every team member at FShop
                  works tirelessly to ensure you find exactly what you're
                  looking for, backed by our promise of quality, authenticity,
                  and customer satisfaction.
                </p>
                <div className="flex justify-center gap-[40px] mt-[40px]">
                  <div>
                    <Clock className="w-[40px] h-[40px] mx-auto mb-[12px]" />
                    <p className="text-[18px] font-medium">Always Available</p>
                  </div>
                  <div>
                    <BadgeCheck className="w-[40px] h-[40px] mx-auto mb-[12px]" />
                    <p className="text-[18px] font-medium">
                      Quality Guaranteed
                    </p>
                  </div>
                  <div>
                    <Heart className="w-[40px] h-[40px] mx-auto mb-[12px]" />
                    <p className="text-[18px] font-medium">Customer Focused</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
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
              <h2 className="text-5xl font-bold dark:text-white">
                New Arrivals
              </h2>
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
              {newProducts.data
                .slice(0, 8)
                .map((product: Product, index: number) => (
                  <motion.div
                    key={product.id}
                    variants={staggerItem}
                    custom={index}
                  >
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
              {reviews?.map((review: any) => (
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
const getInitials = (name?: string) => {
  if (!name) return "?";

  return name
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
            alt={item.user.name}
          />
          <AvatarFallback className="rounded-full bg-gradient-primary text-white">
            {getInitials(item.user.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-base dark:text-white">
            {item.user.name}
          </p>
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
    <motion.div
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <p
        className={cn(
          "text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
          gradient
        )}
      >
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
