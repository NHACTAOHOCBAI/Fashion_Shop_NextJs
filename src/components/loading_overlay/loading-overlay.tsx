"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const LoadingOverlay = () => {
    const { isLoading } = useSelector((state: RootState) => state.loading)
    return (
        isLoading && (
            <div className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-gradient-to-br from-black/10 to-black/20 blur-in-lg animate-fadeIn">
                <DotLottieReact
                    src="/assets/loading-overlay.lottie"
                    loop
                    autoplay
                    className="w-[500px]"
                />
            </div>
        )
    );
};

export default LoadingOverlay;
