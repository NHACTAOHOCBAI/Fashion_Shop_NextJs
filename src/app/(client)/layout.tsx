'use client'
import Footer from '@/app/(client)/_components/footer'
import Header from '@/app/(client)/_components/header'
import { useAuthInit } from '@/hooks/useAuthInit'
import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
    useAuthInit()

    return (
        <>
            <Header />
            <main className="mx-auto w-[1200px] py-[20px]">
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout