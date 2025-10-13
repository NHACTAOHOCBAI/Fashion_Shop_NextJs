'use client'
import Footer from '@/app/(client)/_components/footer'
import Header from '@/app/(client)/_components/header'
import Loading from '@/app/(client)/loading'
import { useAuthInit } from '@/hooks/useAuthInit'
import React, { Suspense } from 'react'

function Layout({ children }: { children: React.ReactNode }) {
    useAuthInit()

    return (
        <>
            <Header />
            <main className="mx-auto w-[1200px] py-[20px]">
                <Suspense fallback={<Loading />}>
                    {children}
                </Suspense>
            </main>
            <Footer />
        </>
    )
}

export default Layout