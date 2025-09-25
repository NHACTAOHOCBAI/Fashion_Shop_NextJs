'use client'
import Filters from "@/app/(client)/products/[department]/[category]/_components/Filters"
import ProductCard from "@/app/(client)/products/[department]/[category]/_components/ProductCard"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useProducts } from "@/hooks/queries/useProduct"
import slugToTitle from "@/lib/slugToTitle"
import { use } from "react"

const Products = ({
    params,
}: {
    params: Promise<{ department: string, category: string }>
}) => {
    const { category, department } = use(params)
    const { data: products } = useProducts({})

    return (
        <div className=" ">
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
                <div className="flex justify-between ">
                    <div >
                        <p className="font-bold text-2xl">{slugToTitle(category)}</p>
                        <p className="text-[#6B6565] text-[13px]">Step into effortless style with our Classic Comfort Sandals, designed for all–day wear. Crafted with a soft yet durable sole and adjustable straps, these sandals provide a secure fit while keeping your feet cool and comfortable. Whether you’re strolling along the beach, exploring the city, or enjoying a casual outing, this versatile pair perfectly balances fashion and function.</p>
                    </div>
                    <Select>
                        <SelectTrigger className="w-[180px]">
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
                </div>
            </div>
            <div className="flex">
                <div className="w-[300px] ">
                    <Filters />
                </div>
                <div className="flex-[1]">
                    <div className="grid grid-cols-3  gap-y-[10px] px-[10px]">
                        {products?.data.map((product) =>
                            <ProductCard key={product.id} item={product} />
                        )}
                        {products?.data.map((product) =>
                            <ProductCard key={product.id} item={product} />
                        )}
                        {products?.data.map((product) =>
                            <ProductCard key={product.id} item={product} />
                        )}
                        {products?.data.map((product) =>
                            <ProductCard key={product.id} item={product} />
                        )}
                    </div>
                    <Pagination>
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
        </div>
    )
}
export default Products