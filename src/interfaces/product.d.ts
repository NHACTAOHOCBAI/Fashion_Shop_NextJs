interface Product {
  thumbnail: string;
  finalPrice: any;
  id: number;
  name: string;
  description: string;
  price: string;
  averageRating: string;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  brand: Brand;
  variants: Variant[];
  images: ProductImage[];
}
interface ProductImage {
  id: number;
  imageUrl: string;
  publicId: string;
}
interface Variant {
  product: Product;
  id: number;
  imageUrl: string;
  publicId: string;
  quantity: number;
  remaining: number;
  variantAttributeValues: VariantAttributeValue[];
}
interface VariantAttributeValue {
  id: number;
  attributeCategory: AttributeCategory;
}
