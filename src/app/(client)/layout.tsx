import Footer from '@/app/(client)/_components/footer'
import Header from '@/app/(client)/_components/header'
import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout