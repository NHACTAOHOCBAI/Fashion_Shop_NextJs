interface Product {
    id: number,
    name: string,
    description: string,
    price: number;
    createdAt: string;
    updatedAt: string;
    category: Category;
    brand: Brand;
    variants: Variant[];
    images: ProductImage[]
}
interface ProductImage {
    id: number;
    imageUrl: string;
    publicId: string
}
interface Variant {
    id: number;
    size: number;
    color: number;
    imageUrl: string;
    publicId: string;
    quantity: number;
    remaining: number;
    price: number;
}