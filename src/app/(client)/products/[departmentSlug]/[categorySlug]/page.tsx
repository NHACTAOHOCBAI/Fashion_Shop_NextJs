'use client'
import Filters from "@/app/(client)/products/[departmentSlug]/[categorySlug]/_components/Filters"
import ProductCard from "@/app/(client)/_components/ProductCard"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetCategoryBySlug } from "@/hooks/queries/useCategory"
import { useProducts } from "@/hooks/queries/useProduct"
import slugToTitle from "@/lib/slugToTitle"
import Image from "next/image"
import { use, useState, useMemo } from "react"
import { fi } from "zod/v4/locales"

const Products = ({
    params,
}: {
    params: Promise<{ departmentSlug: string, categorySlug: string }>
}) => {
    const [page, setPage] = useState(1)

    const { categorySlug, departmentSlug } = use(params)
    const { data: category } = useGetCategoryBySlug(categorySlug)

    // 🧩 State để lưu filters được chọn từ component Filters
    const [filters, setFilters] = useState<{
        selectedValues: Record<string, number[]>,
        priceRange: [number, number]
    }>({
        selectedValues: {},
        priceRange: [0, 100],
    })

    // ✅ Chuẩn bị query params gửi API
    const queryParams = useMemo(() => {
        const attributeCategoryIds: number[] =
            Object.keys(filters.selectedValues).length > 0
                ? Object.values(filters.selectedValues).flat()
                : []
        return {
            categoryId: category?.id || 0,
            attributeCategoryIds,
            // minPrice: filters.priceRange[0],
            // maxPrice: filters.priceRange[1],
            page, // 👈 thêm dòng này
            limit: 9 // giới hạn mỗi trang 9 sản phẩm
        }
    }, [filters, category, page])


    const { data: products } = useProducts(queryParams)

    return (
        <div className="flex gap-[20px]">
            <div className="w-[300px] ">
                <Filters
                    attributeCategories={category?.attributeCategories || []}
                    onFilterChange={setFilters}
                />
            </div>
            <div className="flex-[1]">
                <div className="pb-[20px]">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                {slugToTitle(departmentSlug)}
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage> {slugToTitle(categorySlug)}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>

                    <div className="rounded relative bg-app-secondary min-h-[200px] px-[60px] py-[20px] text-white mt-[10px]">
                        <div className="w-[500px]">
                            <p className="font-bold text-2xl">{slugToTitle(categorySlug)}</p>
                            <p className=" mt-[5px] text-[13px]">{category?.description}</p>
                        </div>
                        <Image
                            alt="category image"
                            src={category?.imageUrl || "https://png.pngtree.com/png-vector/20231230/ourmid/pngtree-dropshipping-men-hole-sole-jogging-shoes-png-image_11389148.png"}
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
                            <SelectItem value="bestselling">Best Selling</SelectItem>
                            <SelectItem value="newest">Newest Arrivals</SelectItem>
                            <SelectItem value="lowtohigh">Price: Low to High</SelectItem>
                            <SelectItem value="hightolow">Price: High to Low</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div className="grid grid-cols-3 gap-y-[10px] mt-[10px]">
                    {products?.data?.map((product) =>
                        <ProductCard key={product.id} item={product} />
                    )}
                </div>

                <Pagination className="mt-[10px]">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (page > 1) setPage(page - 1)
                                }}
                            />
                        </PaginationItem>

                        {Array.from(
                            { length: Math.ceil((products?.pagination?.total || 0) / (products?.pagination?.limit || 1)) },
                            (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        href="#"
                                        isActive={page === i + 1}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setPage(i + 1)
                                        }}
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (page < Math.ceil((products?.pagination?.total || 0) / (products?.pagination?.limit || 1)))
                                        setPage(page + 1)
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </div>
        </div>
    )
}
export default Products
