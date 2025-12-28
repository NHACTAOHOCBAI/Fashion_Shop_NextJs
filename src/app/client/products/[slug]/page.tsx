/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ImageSearchModal from "@/app/client/_components/ImageSearchModal";
import MyBreadcrumb from "@/app/client/_components/MyBreadcumb";
import {
  FilterGroup,
  PriceGroup,
} from "@/app/client/products/_components/FilterGroup";
import { CustomPagination } from "@/app/client/products/_components/MyPagination";
import ProductCard from "@/app/client/products/_components/ProductCard";
import SearchInput from "@/app/client/products/_components/SearchInput";
import SortByButton from "@/app/client/products/_components/SortByButton";
import { ProductCardSkeleton } from "@/components/ui/skeleton-variants";
import { EmptySearch } from "@/components/ui/empty-states";
import { useGetCategoryById } from "@/hooks/queries/useCategory";
import { useProducts } from "@/hooks/queries/useProduct";
import { useDebounce } from "@/hooks/useDebounce";
import { motion, AnimatePresence } from "framer-motion";
import { staggerContainer, staggerItem, fadeIn } from "@/lib/animations";
import { X, Package } from "lucide-react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import VoiceSearchModal from "@/app/client/products/_components/VoiceSearchModal";

const formatToFilterData = (
  data: AttributeCategory[] /* AttributeCategory[] */
) => {
  const groupedData = new Map<string, string[]>();

  data.forEach((item) => {
    const fieldName = item.attribute.name;
    const value = item.value;

    if (groupedData.has(fieldName)) {
      groupedData.get(fieldName)!.push(value);
    } else {
      groupedData.set(fieldName, [value]);
    }
  });

  const filterData = Array.from(groupedData.entries()).map(
    ([fieldName, valuesArray]) => ({
      field: fieldName,
      values: valuesArray,
    })
  );

  return filterData;
};

// Hàm chuyển đổi filters đã chọn thành attributeCategoryIds
const filtersToAttributeCategoryIds = (
  selectedFilters: { [key: string]: string[] },
  categoryAttributesData: any[] /* AttributeCategory[] */
): number[] => {
  const selectedIds: number[] = [];
  for (const fieldName in selectedFilters) {
    if (selectedFilters.hasOwnProperty(fieldName)) {
      const selectedValues = selectedFilters[fieldName];
      const normalizedFieldName = fieldName.toLowerCase();
      categoryAttributesData.forEach((item) => {
        const attributeName = item.attribute.name.toLowerCase();
        const isMatchingField = attributeName === normalizedFieldName;
        const isSelectedValue = selectedValues.includes(item.value);

        if (isMatchingField && isSelectedValue) {
          selectedIds.push(item.id);
        }
      });
    }
  }
  return Array.from(new Set(selectedIds));
};
const Products = () => {
  const [sort, setSort] = useState<{
    sortBy: string;
    sortOrder: "ASC" | "DESC";
  }>({ sortBy: "", sortOrder: "ASC" });

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category");

  // Lấy dữ liệu danh mục
  const { data: category } = useGetCategoryById(categoryId ? +categoryId : 0);

  // Sử dụng useMemo để tính toán filterData chỉ khi categoryAttributes thay đổi
  const filterData = useMemo(() => {
    if (!category || !category.isActive) return [];

    const activeAttributeCategories =
      category.attributeCategories?.filter(
        (item) => item.isActive && item.attribute.isActive !== false
      ) || [];

    return formatToFilterData(activeAttributeCategories);
  }, [category]);

  const [page, setPage] = useState(1);
  // Khởi tạo state filters với một đối tượng rỗng
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({});
  // Thêm state cho Price Range
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 25]);

  // Vùng FIX LỖI RENDER VÔ HẠN: Thiết lập/Reset state filters khi category thay đổi
  useEffect(() => {
    // Chỉ reset khi có dữ liệu category hợp lệ (để đảm bảo filterData được tính đúng)
    if (category?.attributeCategories) {
      const newInitialFilters: { [key: string]: string[] } = {};

      // Tạo cấu trúc filters dựa trên filterData mới
      filterData.forEach((f) => {
        newInitialFilters[f.field] = [];
      });
      newInitialFilters["brands"] = []; // THÊM BRANDS VÀO STATE KHỞI TẠO BẰNG TAY

      // Cập nhật state filters
      setFilters(newInitialFilters);
      setPage(1); // Reset trang về 1 khi danh mục/filters thay đổi
      setPriceRange([0, 25]); // Reset Price Range
    }
  }, [category?.id]); // Chạy lại khi categoryId hoặc attributes của category thay đổi.

  const handleFilterChange = (
    field: string,
    value: string,
    checked: boolean
  ) => {
    // Đảm bảo setPage về 1 khi filters thay đổi
    setPage(1);
    setFilters((prev) => {
      // Đảm bảo lấy đúng mảng giá trị của field hiện tại
      const prevValues = prev[field] || [];
      const newValues = checked
        ? [...prevValues, value]
        : prevValues.filter((v) => v !== value);

      return { ...prev, [field]: newValues };
    });
  };

  // Tính toán queryParams (giữ nguyên logic useMemo)
  const queryParams: any /* ProductQueryParams */ = useMemo(() => {
    const attributeCategoryIds = filtersToAttributeCategoryIds(
      filters,
      category?.attributeCategories || []
    );
    // const brandIds = filtersToBrandIds(
    //   filters["brands"],
    //   category?.brands || []
    // );
    return {
      ...(sort.sortBy && { sortBy: sort.sortBy, sortOrder: sort.sortOrder }),
      ...(searchInput && { search: debouncedSearchTerm }),
      categoryId: category?.id || 0,
      // brandIds,
      attributeCategoryIds,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      page,
      limit: 9,
    };
  }, [
    filters,
    page,
    priceRange,
    category,
    debouncedSearchTerm,
    sort,
    searchInput,
  ]);

  const { data: products, isLoading } = useProducts(queryParams);

  const handlePageChange = (newPage: number) => {
    const totalPages = products?.pagination?.total ?? 1;
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // Helper function to get all active filters
  const getActiveFilters = () => {
    const active: { field: string; value: string }[] = [];
    Object.entries(filters).forEach(([field, values]) => {
      values.forEach((value) => {
        active.push({ field, value });
      });
    });
    return active;
  };

  const activeFilters = getActiveFilters();
  const hasProducts = products?.data && products.data.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Breadcrumb */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="w-[1240px] mx-auto py-4">
          <MyBreadcrumb data={[pathname.split("/")[3], category?.name || ""]} />
        </div>
      </div>

      <div className="w-[1240px] mx-auto py-12 flex gap-8">
        {/* FILTERS SIDEBAR */}
        <motion.aside
          className="w-[270px] flex flex-col gap-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="sticky top-24 space-y-6">
            {filterData.map((filter: any) => (
              <FilterGroup
                key={filter.field}
                field={filter.field}
                values={filter.values}
                selectedValues={filters[filter.field] || []}
                onChange={handleFilterChange}
              />
            ))}
            <PriceGroup range={priceRange} setRange={setPriceRange} />
          </div>
        </motion.aside>

        {/* MAIN CONTENT */}
        <motion.div
          className="flex-1 flex flex-col gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* SEARCH + SORT BAR */}
          <div className="bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <SearchInput
                  value={searchInput}
                  onChange={(value) => setSearchInput(value)}
                />
                <ImageSearchModal />
                <VoiceSearchModal />
              </div>

              <SortByButton
                onSortChange={(sortBy: string, sortOrder: "ASC" | "DESC") =>
                  setSort({ sortBy, sortOrder })
                }
              />
            </div>

            {/* Results count with icon */}
            <div className="flex items-center gap-2 mt-4">
              <Package className="w-5 h-5 text-[#40BFFF]" />
              <p className="text-lg text-[#40BFFF] dark:text-gray-300">
                <span className="font-bold text-[#40BFFF]">
                  {products?.pagination.total || 0}
                </span>{" "}
                {products?.pagination.total === 1 ? "item" : "items"} found
              </p>
            </div>

            {/* Active Filters */}
            <AnimatePresence>
              {activeFilters.length > 0 && (
                <motion.div
                  className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
                    Active filters:
                  </span>
                  {activeFilters.map((filter, index) => (
                    <motion.button
                      key={`${filter.field}-${filter.value}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[var(--cyan-100)] to-[var(--cyan-50)] dark:from-[var(--cyan-900)] dark:to-[var(--cyan-800)] text-[var(--cyan-700)] dark:text-[var(--cyan-300)] rounded-full text-sm font-medium border border-[var(--cyan-200)] dark:border-[var(--cyan-700)] hover:shadow-md transition-all"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() =>
                        handleFilterChange(filter.field, filter.value, false)
                      }
                    >
                      <span className="capitalize">{filter.value}</span>
                      <X className="w-3.5 h-3.5" />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* CATEGORY BANNER */}
          <motion.div
            className="relative overflow-hidden rounded-2xl shadow-2xl h-[300px]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--cyan-400)] via-[var(--cyan-500)] to-[var(--cyan-600)]" />

            {/* Animated overlay blobs */}
            <motion.div
              className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--yellow-400)]/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -30, 0],
                y: [0, 20, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex items-center pl-16">
              <div className="flex-1">
                <motion.h2
                  className="text-4xl font-bold text-white mb-4 drop-shadow-lg"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {category?.name}
                </motion.h2>
                <motion.p
                  className="text-white/90 text-lg max-w-md leading-relaxed drop-shadow"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {category?.description}
                </motion.p>
              </div>

              {/* Category Image with parallax effect */}
              {category?.imageUrl && (
                <motion.div
                  className="absolute right-8 top-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                >
                  <Image
                    height={350}
                    width={350}
                    alt={category?.name || ""}
                    src={category?.imageUrl}
                    className="w-[350px] h-[350px] object-contain drop-shadow-2xl"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* PRODUCTS GRID */}
          {isLoading ? (
            <div className="grid grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : !hasProducts ? (
            <EmptySearch query={searchInput} />
          ) : (
            <motion.div
              className="grid grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {products.data.map((product: any, index: number) => (
                <motion.div key={product.id} variants={staggerItem}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* PAGINATION */}
          {hasProducts && (
            <motion.div
              className="flex justify-center mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <CustomPagination
                currentPage={page}
                totalPages={Math.max(
                  1,
                  Math.ceil(
                    (products?.pagination?.total ?? 0) /
                      (products?.pagination?.limit ?? 1)
                  )
                )}
                onPageChange={handlePageChange}
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
export default Products;
