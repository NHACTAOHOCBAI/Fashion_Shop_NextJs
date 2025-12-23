"use client";

import {
  Heart,
  Target,
  Users,
  TrendingUp,
  Award,
  Shield,
  Sparkles,
  Clock,
  Package,
  HeadphonesIcon,
  Truck,
  BadgeCheck,
} from "lucide-react";

const AboutUsPage = () => {
  return (
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
              <p className="text-[42px] font-bold text-[#40BFFF]">10K+</p>
              <p className="text-[16px] text-gray-600 mt-[8px]">
                Products Available
              </p>
            </div>
            <div className="bg-white rounded-[16px] p-[30px] shadow-lg">
              <p className="text-[42px] font-bold text-[#40BFFF]">5K+</p>
              <p className="text-[16px] text-gray-600 mt-[8px]">
                Happy Customers
              </p>
            </div>
            <div className="bg-white rounded-[16px] p-[30px] shadow-lg">
              <p className="text-[42px] font-bold text-[#40BFFF]">98%</p>
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
                fashion shopping smarter, faster, and more personalized through
                the power of artificial intelligence.
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
                    Combining fashion expertise with cutting-edge AI technology
                    to deliver an unmatched shopping experience
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
                To become the world's leading AI-powered fashion platform where
                technology and style converge, making personalized fashion
                accessible to everyone, everywhere.
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
                We operate with transparency, honesty, and ethical practices in
                all interactions
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
                We strive for exceptional quality in every product, service, and
                interaction
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
                    Our support team is always ready to help with any questions
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
                works tirelessly to ensure you find exactly what you're looking
                for, backed by our promise of quality, authenticity, and
                customer satisfaction.
              </p>
              <div className="flex justify-center gap-[40px] mt-[40px]">
                <div>
                  <Clock className="w-[40px] h-[40px] mx-auto mb-[12px]" />
                  <p className="text-[18px] font-medium">Always Available</p>
                </div>
                <div>
                  <BadgeCheck className="w-[40px] h-[40px] mx-auto mb-[12px]" />
                  <p className="text-[18px] font-medium">Quality Guaranteed</p>
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
  );
};

export default AboutUsPage;
