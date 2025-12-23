"use client";

import {
  Camera,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Star,
  Quote,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/app/client/products/_components/ProductCard";
import { useProducts } from "@/hooks/queries/useProduct";

const HomePage = () => {
  // Fetch new arrivals (latest 8 products)
  const { data: newProducts, isLoading: productsLoading } = useProducts({
    page: 1,
    limit: 8,
    sortBy: "createdAt",
    sortOrder: "DESC",
  });

  const handleImageSearchClick = () => {
    const imageInput = document.getElementById("image-input");
    if (imageInput) {
      (imageInput as HTMLInputElement).click();
    }
  };

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
      <section className="bg-gradient-to-br from-[#40BFFF]/10 via-white to-[#FFD470]/10 py-[100px]">
        <div className="w-[1240px] mx-auto flex items-center justify-between gap-[60px]">
          {/* Left: Content */}
          <div className="flex-1">
            <h1 className="text-[56px] font-bold leading-tight">
              Discover Fashion
              <br />
              <span className="text-[#40BFFF]">Powered by AI</span>
            </h1>

            <p className="text-[20px] text-gray-600 mt-[20px] max-w-[500px]">
              Experience smart shopping with AI-powered image search and
              personalized recommendations. Find your perfect style
              effortlessly.
            </p>

            <div className="flex gap-[20px] mt-[40px]">
              <Link href="/client/products/men">
                <button
                  className="px-[40px] py-[16px] bg-[#40BFFF] text-white text-[18px]
                             font-medium rounded-[4px] hover:bg-[#3AADEB]
                             transition-all duration-200 active:scale-95
                             shadow-lg hover:shadow-xl"
                >
                  Shop Now
                </button>
              </Link>

              <button
                onClick={scrollToAIFeatures}
                className="px-[28px] py-[14px] border-2 border-[#40BFFF] text-[#40BFFF]
                           rounded-[4px] font-medium hover:bg-[#40BFFF] hover:text-white
                           transition-all duration-300 active:scale-95 text-[18px]"
              >
                Explore AI Features
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex gap-[40px] mt-[50px]">
              <div>
                <p className="text-[32px] font-bold text-[#40BFFF]">10K+</p>
                <p className="text-gray-600">Products</p>
              </div>
              <div>
                <p className="text-[32px] font-bold text-[#40BFFF]">5K+</p>
                <p className="text-gray-600">Happy Customers</p>
              </div>
              <div>
                <p className="text-[32px] font-bold text-[#40BFFF]">4.8</p>
                <p className="text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>

          {/* Right: Hero Visual */}
          <div className="relative w-[500px] h-[500px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#40BFFF]/20 to-[#FFD470]/20 rounded-[20px] blur-3xl" />
            <div className="relative bg-white/80 backdrop-blur-sm rounded-[20px] p-[30px] shadow-xl border border-gray-100">
              <div className="w-full h-full bg-[#F6F7F8] rounded-[10px] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-[100px] h-[100px] mx-auto mb-[20px] bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] rounded-full flex items-center justify-center">
                    <Camera className="w-[50px] h-[50px] text-white" />
                  </div>
                  <p className="text-gray-700 font-medium text-[20px]">
                    AI-Powered Shopping
                  </p>
                  <p className="text-gray-500 text-[14px] mt-[8px]">
                    Upload images to find products
                  </p>
                </div>
              </div>
            </div>
          </div>
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

              <button
                onClick={handleImageSearchClick}
                className="px-[24px] py-[12px] bg-[#40BFFF] text-white rounded-[4px]
                           font-medium hover:bg-[#3AADEB] transition-all duration-200
                           active:scale-95 flex items-center gap-[10px]"
              >
                <Camera className="w-[18px] h-[18px]" />
                Try Image Search
              </button>
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
      <section className="py-[80px] bg-[#F6F7F8]">
        <div className="w-[1240px] mx-auto">
          <div className="flex justify-between items-end mb-[50px]">
            <div>
              <h2 className="text-[42px] font-bold">New Arrivals</h2>
              <p className="text-[20px] text-gray-600 mt-[10px]">
                Fresh styles just added to our collection
              </p>
            </div>

            <Link
              href="/client/products/men"
              className="text-[18px] text-[#40BFFF] font-medium hover:underline
                         flex items-center gap-[8px] group"
            >
              View All
              <ArrowRight className="w-[20px] h-[20px] group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {productsLoading ? (
            <div className="flex justify-center items-center py-[100px]">
              <Loader2 className="w-[50px] h-[50px] animate-spin text-[#40BFFF]" />
            </div>
          ) : newProducts?.data && newProducts.data.length > 0 ? (
            <div className="grid grid-cols-4 gap-[30px]">
              {newProducts.data.slice(0, 8).map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-[100px]">
              <p className="text-[18px] text-gray-500">
                No new arrivals at the moment. Check back soon!
              </p>
            </div>
          )}

          {/* CTA Bar */}
          <div className="mt-[60px] text-center">
            <Link href="/client/products/men">
              <button
                className="px-[40px] py-[16px] bg-[#40BFFF] text-white text-[18px]
                             font-medium rounded-[4px] hover:bg-[#3AADEB]
                             transition-all duration-200 active:scale-95
                             shadow-lg hover:shadow-xl"
              >
                Explore All Products
              </button>
            </Link>
          </div>
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

            <div className="grid grid-cols-3 gap-[30px]">
              {/* Review 1 */}
              <div className="bg-white rounded-[20px] p-[30px] border-2 border-gray-100 hover:border-[#40BFFF] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-[2px] mb-[20px]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-[20px] h-[20px] fill-[#FFD470] text-[#FFD470]"
                    />
                  ))}
                </div>

                <Quote className="w-[30px] h-[30px] text-[#40BFFF]/30 mb-[16px]" />

                <p className="text-[16px] text-gray-700 leading-relaxed mb-[24px]">
                  "The AI image search feature is a game-changer! I uploaded a
                  photo of a dress I loved and found similar styles instantly.
                  Shopping has never been easier!"
                </p>

                <div className="flex items-center gap-[12px]">
                  <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-[#40BFFF] to-[#5ECCFF] flex items-center justify-center text-white font-bold text-[18px]">
                    SA
                  </div>
                  <div>
                    <p className="font-semibold text-[16px]">Sarah Anderson</p>
                    <p className="text-[14px] text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </div>

              {/* Review 2 */}
              <div className="bg-white rounded-[20px] p-[30px] border-2 border-gray-100 hover:border-[#40BFFF] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-[2px] mb-[20px]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-[20px] h-[20px] fill-[#FFD470] text-[#FFD470]"
                    />
                  ))}
                </div>

                <Quote className="w-[30px] h-[30px] text-[#40BFFF]/30 mb-[16px]" />

                <p className="text-[16px] text-gray-700 leading-relaxed mb-[24px]">
                  "Outstanding quality and fast delivery! The AI chatbot helped
                  me find the perfect size and style. Customer service is
                  top-notch. Highly recommend!"
                </p>

                <div className="flex items-center gap-[12px]">
                  <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-[#FFD470] to-[#FFC940] flex items-center justify-center text-gray-800 font-bold text-[18px]">
                    MJ
                  </div>
                  <div>
                    <p className="font-semibold text-[16px]">Michael Johnson</p>
                    <p className="text-[14px] text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </div>

              {/* Review 3 */}
              <div className="bg-white rounded-[20px] p-[30px] border-2 border-gray-100 hover:border-[#40BFFF] transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center gap-[2px] mb-[20px]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-[20px] h-[20px] fill-[#FFD470] text-[#FFD470]"
                    />
                  ))}
                </div>

                <Quote className="w-[30px] h-[30px] text-[#40BFFF]/30 mb-[16px]" />

                <p className="text-[16px] text-gray-700 leading-relaxed mb-[24px]">
                  "Love the personalized recommendations! The selection is
                  amazing and prices are great. I've already recommended this
                  store to all my friends!"
                </p>

                <div className="flex items-center gap-[12px]">
                  <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-br from-[#FF4858] to-[#FF6B7A] flex items-center justify-center text-white font-bold text-[18px]">
                    EC
                  </div>
                  <div>
                    <p className="font-semibold text-[16px]">Emily Chen</p>
                    <p className="text-[14px] text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-[40px] text-center bg-[#F6F7F8] rounded-[16px] p-[24px]">
              <p className="text-[16px] text-gray-700">
                <span className="font-semibold text-[#40BFFF]">4.8/5</span>{" "}
                average rating from{" "}
                <span className="font-semibold">5,000+ verified reviews</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
