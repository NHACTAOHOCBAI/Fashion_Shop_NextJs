import Footer from '@/app/(client)/_components/footer'
import Header from '@/app/(client)/_components/header'
import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
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