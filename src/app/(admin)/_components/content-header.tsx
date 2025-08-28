'use client'
import urlToName from "@/lib/urlToName"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

const ContentHeader = () => {
    const pathname = usePathname()
    const urls = pathname.split('/')
    console.log(urls)
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <div >
                        {urlToName(urls[1])}
                    </div>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage> {urlToName(urls[2])}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}
export default ContentHeader