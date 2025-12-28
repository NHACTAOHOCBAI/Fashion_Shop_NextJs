"use client";

import { usePersonalizedRecommendations } from "@/hooks/queries/useProduct";
import ProductCard from "@/app/client/products/_components/ProductCard";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const RecommendedProducts = () => {
  const { data: recommendations, isLoading, isError } = usePersonalizedRecommendations();

  // Don't show section if no recommendations or error
  if (isError || !recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-white via-cyan-50/30 to-white dark:from-gray-900 dark:via-cyan-950/20 dark:to-gray-900">
      <div className="w-[1240px] mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30 mb-4">
            <Sparkles className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-300 uppercase tracking-wide">
              Curated For You
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Recommended Just For{" "}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              You
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Based on your purchase history and preferences, we think you'll love these
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-[380px] rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!isLoading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {recommendations.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        
      </div>
    </section>
  );
};

export default RecommendedProducts;
