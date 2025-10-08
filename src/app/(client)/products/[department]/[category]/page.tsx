'use client'
import Filters from "@/app/(client)/products/[department]/[category]/_components/Filters"
import ProductCard from "@/app/(client)/products/[department]/[category]/_components/ProductCard"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProducts } from "@/hooks/queries/useProduct"
import slugToTitle from "@/lib/slugToTitle"
import Image from "next/image"
import { use } from "react"

const Products = ({
    params,
}: {
    params: Promise<{ department: string, category: string }>
}) => {
    const { category, department } = use(params)
    const { data: products } = useProducts({})

    return (
        <div className="flex gap-[20px]">
            <div className="w-[300px] ">
                <Filters />
            </div>
            <div className="flex-[1]">
                <div className="pb-[20px]">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                {slugToTitle(department)}
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage> {slugToTitle(category)}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="rounded relative bg-[#40BFFF] min-h-[200px] px-[60px] py-[20px] text-white mt-[10px]">
                        <div className="w-[500px]">
                            <p className="font-bold text-2xl">{slugToTitle(category)}</p>
                            <p className=" mt-[5px] text-[13px]">Step into effortless style with our Classic Comfort Sandals, designed for all–day wear. Crafted with a soft yet durable sole and adjustable straps, these sandals provide a secure fit while keeping your feet cool and comfortable. Whether you’re strolling along the beach, exploring the city, or enjoying a casual outing, this versatile pair perfectly balances fashion and function.</p>
                        </div>
                        <Image
                            alt="category image"
                            src="https://png.pngtree.com/png-vector/20231230/ourmid/pngtree-dropshipping-men-hole-sole-jogging-shoes-png-image_11389148.png"
                            width={1000}
                            height={1000}
                            className="w-[300px] h-[300px] object-contain ml-auto absolute right-0 bottom-0"
                        />
                    </div>
                </div>
                <Select>
                    <SelectTrigger className="w-[180px] ml-auto">
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sort by</SelectLabel>
                            <SelectItem value="apple">Best Selling</SelectItem>
                            <SelectItem value="banana">Newest Arrivals</SelectItem>
                            <SelectItem value="blueberry">Price: Low to High</SelectItem>
                            <SelectItem value="blueberry">Price: High to Low</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="grid grid-cols-3  gap-y-[10px]">
                    {products?.data.map((product) =>
                        <ProductCard key={product.id} item={product} />
                    )}
                </div>
                <Pagination className="mt-[10px]">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}
export default Products