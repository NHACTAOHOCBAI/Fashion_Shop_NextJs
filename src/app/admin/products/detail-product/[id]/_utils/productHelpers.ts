/**
 * Product Helper Utilities
 * Helper functions for product detail page calculations and formatting
 */

/**
 * Calculate product statistics from variants
 */
export const calculateProductStats = (product: Product) => {
  const totalStock = product.variants.reduce((sum, v) => sum + v.quantity, 0);
  const totalRemaining = product.variants.reduce(
    (sum, v) => sum + v.remaining,
    0
  );
  const totalSold = totalStock - totalRemaining;
  const lowStockCount = product.variants.filter(
    (v) => v.remaining < v.quantity * 0.2 && v.remaining > 0
  ).length;
  const outOfStockCount = product.variants.filter(
    (v) => v.remaining === 0
  ).length;

  return {
    totalStock,
    totalRemaining,
    totalSold,
    lowStockCount,
    outOfStockCount,
    variantCount: product.variants.length,
  };
};

/**
 * Get stock status badge configuration
 */
export const getStockStatus = (remaining: number, quantity: number) => {
  if (remaining === 0) {
    return {
      label: "Out of Stock",
      variant: "destructive" as const,
      dotColor: "bg-red-500",
    };
  }
  if (remaining < quantity * 0.2) {
    return {
      label: "Low Stock",
      variant: "secondary" as const,
      dotColor: "bg-yellow-500",
    };
  }
  return {
    label: "In Stock",
    variant: "default" as const,
    dotColor: "bg-green-500",
  };
};

/**
 * Format variant attributes for display
 * Example: "Red / M / Slim"
 */
export const formatVariantAttributes = (
  variantAttributeValues: VariantAttributeValue[]
) => {
  return variantAttributeValues
    .map((v) => v.attributeCategory.value)
    .join(" / ");
};
