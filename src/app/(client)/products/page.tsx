/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { ImageWithFallback } from "@/components/image-with-fallback";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProducts } from "@/hooks/queries/useProduct";
import { Eye } from "lucide-react";
import { useState } from "react";

const categories = ["All", "Shirts", "Jackets", "Knitwear", "Blazers", "Pants", "T-Shirts"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["White", "Black", "Gray", "Navy", "Blue", "Beige", "Brown", "Pink", "Olive"];
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
function ProductListing() {
    const { data: products } = useProducts({})
    const [filters, setFilters] = useState({
        category: "",
        sizes: [] as string[],
        colors: [] as string[],
        priceRange: [0, 300]
    });
    const [sortBy, setSortBy] = useState("name");
    const [currentPage, setCurrentPageNum] = useState(1);
    const productsPerPage = 8;

    const categories = ["All", "Shirts", "Jackets", "Knitwear", "Blazers", "Pants", "T-Shirts"];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
    const colors = ["White", "Black", "Gray", "Navy", "Blue", "Beige", "Brown", "Pink", "Olive"];



    const handleViewProduct = (product: any) => {
    };

    const handleAddToCart = (product: any) => {
    };

    const handleFilterChange = (type: string, value: any) => {
        setFilters(prev => ({
            ...prev,
            [type]: value
        }));
        setCurrentPageNum(1);
    };

    const toggleArrayFilter = (type: 'sizes' | 'colors', value: string) => {
        setFilters(prev => ({
            ...prev,
            [type]: prev[type].includes(value)
                ? prev[type].filter(item => item !== value)
                : [...prev[type], value]
        }));
        setCurrentPageNum(1);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Banner */}
            <section className="bg-gradient-to-r from-gray-50 to-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-medium text-black mb-4">{`Men's Collection`}</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our curated selection of premium menswear designed for the modern gentleman
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <aside className="w-64 flex-shrink-0">
                        <div className="sticky top-24 space-y-6">
                            {/* Category Filter */}
                            <div>
                                <Label className="font-medium mb-3 block">Category</Label>
                                <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="All Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Size Filter */}
                            <div>
                                <Label className="font-medium mb-3 block">Size</Label>
                                <div className="space-y-2">
                                    {sizes.map((size) => (
                                        <div key={size} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`size-${size}`}
                                                checked={filters.sizes.includes(size)}
                                                onCheckedChange={() => toggleArrayFilter('sizes', size)}
                                            />
                                            <Label htmlFor={`size-${size}`} className="text-sm">
                                                {size}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Color Filter */}
                            <div>
                                <Label className="font-medium mb-3 block">Color</Label>
                                <div className="space-y-2">
                                    {colors.map((color) => (
                                        <div key={color} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`color-${color}`}
                                                checked={filters.colors.includes(color)}
                                                onCheckedChange={() => toggleArrayFilter('colors', color)}
                                            />
                                            <Label htmlFor={`color-${color}`} className="text-sm">
                                                {color}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <Label className="font-medium mb-3 block">
                                    Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                                </Label>
                                {/* <Slider
                                    value={filters.priceRange}
                                    onValueChange={(value) => handleFilterChange('priceRange', value)}
                                    max={300}
                                    min={0}
                                    step={10}
                                    className="w-full"
                                /> */}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Sort and Results */}
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600">
                                Showing {products?.pagination.page} of {products?.pagination.total} products
                            </p>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-48">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="name">Sort by Name</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {products?.data.map((product) => (
                                <Card key={product.id} className="group border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white overflow-hidden">
                                    <div className="aspect-[3/4] relative overflow-hidden">
                                        <ImageWithFallback
                                            src={product.images[0].imageUrl}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                                            onClick={() => handleViewProduct(product)}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <CardContent className="p-4">
                                        <div className="mb-3">
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                                {/* {product.category} */}
                                            </p>
                                            <h3 className="font-medium text-black group-hover:text-gray-600 transition-colors">
                                                {product.name}
                                            </h3>
                                            <p className="text-lg font-medium text-black mt-1">
                                                ${product.price}
                                            </p>
                                        </div>

                                        <Button
                                            variant="outline"
                                            className="w-full rounded-full border-black text-black hover:bg-black hover:text-white transition-all duration-300"
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Add to Cart
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>


                    </main>
                </div>
            </div>
        </div>
    );
}
export default ProductListing