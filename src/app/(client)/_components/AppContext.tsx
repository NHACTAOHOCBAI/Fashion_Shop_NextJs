'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    sizes: string[];
    colors: string[];
    description: string;
    material: string;
    care: string;
}

interface CartItem {
    product: Product;
    size: string;
    color: string;
    quantity: number;
}

interface AppContextType {
    currentPage: string;
    setCurrentPage: (page: string) => void;
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product | null) => void;
    cartItems: CartItem[];
    addToCart: (product: Product, size: string, color: string, quantity: number) => void;
    removeFromCart: (productId: number, size: string, color: string) => void;
    updateCartQuantity: (productId: number, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    getCartItemCount: () => number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [currentPage, setCurrentPage] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product, size: string, color: string, quantity: number) => {
        setCartItems(prev => {
            const existingItem = prev.find(
                item => item.product.id === product.id && item.size === size && item.color === color
            );

            if (existingItem) {
                return prev.map(item =>
                    item === existingItem
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...prev, { product, size, color, quantity }];
        });
    };

    const removeFromCart = (productId: number, size: string, color: string) => {
        setCartItems(prev =>
            prev.filter(item =>
                !(item.product.id === productId && item.size === size && item.color === color)
            )
        );
    };

    const updateCartQuantity = (productId: number, size: string, color: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId, size, color);
            return;
        }

        setCartItems(prev =>
            prev.map(item =>
                item.product.id === productId && item.size === size && item.color === color
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const getCartItemCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <AppContext.Provider value={{
            currentPage,
            setCurrentPage,
            selectedProduct,
            setSelectedProduct,
            cartItems,
            addToCart,
            removeFromCart,
            updateCartQuantity,
            clearCart,
            getCartTotal,
            getCartItemCount
        }
        }>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
}