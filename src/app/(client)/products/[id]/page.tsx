'use client'
import { useState } from "react";
import { Minus, Plus, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const reviews = [
    {
        id: 1,
        name: "Alex M.",
        rating: 5,
        comment: "Excellent quality and perfect fit. Highly recommend!",
        date: "2025-01-15"
    },
    {
        id: 2,
        name: "Sarah K.",
        rating: 4,
        comment: "Great product, fast shipping. Love the material quality.",
        date: "2025-01-10"
    },
    {
        id: 3,
        name: "Mike R.",
        rating: 5,
        comment: "Perfect for everyday wear. Very comfortable and stylish.",
        date: "2025-01-05"
    }
];

const relatedProducts = [
    {
        id: 9,
        name: "Polo Shirt",
        price: 69,
        image: "https://images.unsplash.com/photo-1571119816306-c0c00469dc2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW5zJTIwZmFzaGlvbiUyMGNsb3RoaW5nfGVufDF8fHx8MTc1ODIxMTA0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
        id: 10,
        name: "Chino Pants",
        price: 89,
        image: "https://images.unsplash.com/photo-1706177208693-2e3c68e5f0f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBwYW50cyUyMGZhc2hpb258ZW58MXx8fHwxNzU4Mjg3ODYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
        id: 11,
        name: "Crew Neck Sweater",
        price: 119,
        image: "https://images.unsplash.com/photo-1631193839654-c441ff75237e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzd2VhdGVyJTIwY2xvdGhpbmd8ZW58MXx8fHwxNzU4Mjg3ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
        id: 12,
        name: "Oxford Shirt",
        price: 95,
        image: "https://images.unsplash.com/photo-1657878337883-b568265e5bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzaGlydCUyMGZhc2hpb258ZW58MXx8fHwxNzU4Mjg4MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
];

function ProductDetail() {
    const selectedProduct = {
        id: 1,
        name: "Classic Cotton Shirt",
        price: 89,
        image: "https://images.unsplash.com/photo-1657878337883-b568265e5bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBzaGlydCUyMGZhc2hpb258ZW58MXx8fHwxNzU4Mjg4MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        category: "Shirts",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["White", "Blue", "Black"],
        description: "A timeless cotton shirt perfect for any occasion.",
        material: "100% Cotton",
        care: "Machine wash cold, tumble dry low"
    }
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!selectedProduct) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Product not found</p>
            </div>
        );
    }

    // Mock multiple images for gallery (using same image for demo)
    const productImages = Array(4).fill(selectedProduct.image);

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert("Please select size and color");
            return;
        }
        alert("Added to cart!");
    };

    const handleBuyNow = () => {
        if (!selectedSize || !selectedColor) {
            alert("Please select size and color");
            return;
        }
    };

    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    className="mb-6 hover:bg-gray-100"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Products
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">

                        </div>
                        <div className="flex space-x-2">
                            {productImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`w-20 h-20 rounded-md overflow-hidden border-2 ${currentImageIndex === index ? 'border-black' : 'border-gray-200'
                                        }`}
                                >

                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                        <div>
                            <Badge variant="secondary" className="mb-2">
                                {selectedProduct.category}
                            </Badge>
                            <h1 className="text-3xl font-medium text-black mb-2">
                                {selectedProduct.name}
                            </h1>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="flex items-center">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-4 w-4 ${i < Math.floor(averageRating)
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-600">
                                    ({reviews.length} reviews)
                                </span>
                            </div>
                            <p className="text-2xl font-medium text-black">
                                ${selectedProduct.price}
                            </p>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                            {selectedProduct.description}
                        </p>

                        <Separator />

                        {/* Size Selection */}
                        <div>
                            <label className="font-medium text-black mb-3 block">
                                Size
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {selectedProduct.sizes.map((size) => (
                                    <Button
                                        key={size}
                                        variant={selectedSize === size ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedSize(size)}
                                        className="rounded-md"
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div>
                            <label className="font-medium text-black mb-3 block">
                                Color
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {selectedProduct.colors.map((color) => (
                                    <Button
                                        key={color}
                                        variant={selectedColor === color ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedColor(color)}
                                        className="rounded-md"
                                    >
                                        {color}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selection */}
                        <div>
                            <label className="font-medium text-black mb-3 block">
                                Quantity
                            </label>
                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-12 text-center">{quantity}</span>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setQuantity(quantity + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <Separator />

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button
                                onClick={handleAddToCart}
                                className="w-full bg-black text-white hover:bg-gray-800 rounded-full py-3"
                                size="lg"
                            >
                                Add to Cart
                            </Button>
                            <Button
                                onClick={handleBuyNow}
                                variant="outline"
                                className="w-full border-black text-black hover:bg-black hover:text-white rounded-full py-3"
                                size="lg"
                            >
                                Buy Now
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Product Information Tabs */}
                <div className="mb-16">
                    <Tabs defaultValue="description" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="description">Description</TabsTrigger>
                            <TabsTrigger value="materials">Materials & Care</TabsTrigger>
                            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
                        </TabsList>

                        <TabsContent value="description" className="mt-6">
                            <Card>
                                <CardContent className="p-6">
                                    <p className="text-gray-600 leading-relaxed">
                                        {selectedProduct.description} This premium piece combines contemporary design
                                        with exceptional craftsmanship. Perfect for both casual and formal occasions,
                                        it offers versatility and style that will elevate any wardrobe.
                                    </p>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="materials" className="mt-6">
                            <Card>
                                <CardContent className="p-6 space-y-4">
                                    <div>
                                        <h4 className="font-medium text-black mb-2">Materials</h4>
                                        <p className="text-gray-600">{selectedProduct.material}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-black mb-2">Care Instructions</h4>
                                        <p className="text-gray-600">{selectedProduct.care}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="reviews" className="mt-6">
                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <Card key={review.id}>
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <h4 className="font-medium text-black">{review.name}</h4>
                                                    <div className="flex items-center mt-1">
                                                        {Array.from({ length: 5 }, (_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`h-3 w-3 ${i < review.rating
                                                                    ? 'text-yellow-400 fill-current'
                                                                    : 'text-gray-300'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-500">{review.date}</span>
                                            </div>
                                            <p className="text-gray-600">{review.comment}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Recommended Products */}
                <div>
                    <h2 className="text-2xl font-medium text-black mb-6">You might also like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {relatedProducts.map((product) => (
                            <Card key={product.id} className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white overflow-hidden">
                                <div className="aspect-[3/4] relative overflow-hidden">

                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-medium text-black mb-1">{product.name}</h3>
                                    <p className="text-lg font-medium text-black">${product.price}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ProductDetail