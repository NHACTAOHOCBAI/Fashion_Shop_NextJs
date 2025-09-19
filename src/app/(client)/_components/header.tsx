'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";
function Header() {

    return (
        <header className="border-b border-border bg-white sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <button

                            className="text-xl font-medium text-black hover:text-gray-600 transition-colors"
                        >
                            MODÉ
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="hidden md:flex space-x-8">
                        <button

                            className="text-black hover:text-gray-600 transition-colors"
                        >
                            Home
                        </button>
                        <button

                            className="text-black hover:text-gray-600 transition-colors"
                        >
                            Shop
                        </button>
                        <button

                            className="text-black hover:text-gray-600 transition-colors"
                        >
                            Men
                        </button>
                        <button

                            className="text-black hover:text-gray-600 transition-colors"
                        >
                            Women
                        </button>
                        <button

                            className="text-black hover:text-gray-600 transition-colors"
                        >
                            Sale
                        </button>
                        <a href="#" className="text-black hover:text-gray-600 transition-colors">
                            Contact
                        </a>
                    </nav>

                    {/* Search Bar and Cart */}
                    <div className="flex items-center space-x-4">
                        <div className="relative hidden sm:block">
                            <Input
                                type="search"
                                placeholder="Search products..."
                                className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:border-gray-300"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative"

                        >
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
export default Header