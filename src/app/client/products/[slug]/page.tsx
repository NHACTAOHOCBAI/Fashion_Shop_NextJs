/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ImageSearchModal from "@/app/client/_components/ImageSearchModal";
import Loading from "@/app/client/_components/Loading";
import MyBreadcrumb from "@/app/client/_components/MyBreadcumb";
import {
  FilterGroup,
  PriceGroup,
} from "@/app/client/products/_components/FilterGroup";
import {
  ImageSearchButton,
  ImageSearchPreview,
} from "@/app/client/products/_components/ImageSearch";
// import LoadMoreButton from "@/app/client/products/_components/LoadMoreButton";
import { CustomPagination } from "@/app/client/products/_components/MyPagination";
import ProductCard from "@/app/client/products/_components/ProductCard";
import SearchInput from "@/app/client/products/_components/SearchInput";
import SortByButton from "@/app/client/products/_components/SortByButton";
import { useGetCategoryById } from "@/hooks/queries/useCategory";
import { useProducts } from "@/hooks/queries/useProduct";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react"; // 👈 Thêm useEffect

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
  const filterData = useMemo(
    () => formatToFilterData(category?.attributeCategories || []),
    [category?.attributeCategories]
  );

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

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[#F6F7F8]">
        <div className="w-[1240px] mx-auto py-[16px]">
          <MyBreadcrumb data={[pathname.split("/")[3], category?.name || ""]} />
        </div>
      </div>

      <div className="w-[1240px] mx-auto py-[50px] flex gap-[30px]">
        {/* FILTERS */}
        <div className="w-[270px] flex flex-col gap-[30px]">
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

        {/* PRODUCTS */}
        <div className="flex-1 flex flex-col gap-[30px]">
          {/* SEARCH + SORT */}
          <div className="bg-[#F6F7F8] rounded-[10px] p-[20px]">
            <div className="flex justify-between items-center gap-3">
              <div className="flex items-center flex-1">
                <SearchInput
                  value={searchInput}
                  onChange={(value) => setSearchInput(value)}
                />
                <ImageSearchModal />
              </div>

              <SortByButton
                onSortChange={(sortBy: string, sortOrder: "ASC" | "DESC") =>
                  setSort({ sortBy, sortOrder })
                }
              />
            </div>

            <p className="text-[18px] mt-[10px]">
              <span className="font-medium">{products?.pagination.total}</span>{" "}
              items found
            </p>
          </div>

          {/* CATEGORY BANNER */}
          <div className="relative bg-[#40BFFF] opacity-80 pl-[100px] py-[30px] rounded-[10px] text-white h-[300px]">
            <p className="text-[30px] font-medium">{category?.name}</p>
            <p className="w-[370px] mt-[14px]">{category?.description}</p>

            {category?.imageUrl && (
              <Image
                height={400}
                width={400}
                alt={category?.name || ""}
                src={category?.imageUrl}
                className="w-[400px] h-[400px] object-contain absolute top-0 right-0"
              />
            )}
          </div>

          {/* PRODUCTS GRID */}
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-3 gap-y-3 gap-x-5">
              {products?.data.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* PAGINATION */}
          <div className="flex flex-col items-center gap-4 p-8">
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
