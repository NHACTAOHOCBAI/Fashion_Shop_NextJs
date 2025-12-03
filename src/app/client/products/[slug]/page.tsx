/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loading from "@/app/client/_components/Loading";
import MyBreadcrumb from "@/app/client/_components/MyBreadcumb";
import {
  FilterGroup,
  PriceGroup,
} from "@/app/client/products/_components/FilterGroup";
// import LoadMoreButton from "@/app/client/products/_components/LoadMoreButton";
import { CustomPagination } from "@/app/client/products/_components/MyPagination";
import ProductCard from "@/app/client/products/_components/ProductCard";
import SearchInput from "@/app/client/products/_components/SearchInput";
import SortByButton from "@/app/client/products/_components/SortByButton";
import { useGetCategoryFilter } from "@/hooks/queries/useCategory";
import { useProducts } from "@/hooks/queries/useProduct";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
const formatToFilterData = (data: AttributeCategory[]) => {
  const groupedData = new Map<string, string[]>();

  data.forEach((item) => {
    const fieldName = item.attribute.name;
    const value = item.value;

    if (groupedData.has(fieldName)) {
      // Nếu field đã tồn tại, thêm giá trị vào mảng hiện có
      groupedData.get(fieldName)!.push(value);
    } else {
      // Nếu field chưa tồn tại, tạo mảng mới và thêm giá trị
      groupedData.set(fieldName, [value]);
    }
  });

  // 2. Chuyển đổi Map thành mảng các đối tượng FilterItem
  const filterData = Array.from(groupedData.entries()).map(
    ([fieldName, valuesArray]) => ({
      field: fieldName,
      values: valuesArray,
    })
  );

  return filterData;
};
const filtersToAttributeCategoryIds = (
  selectedFilters: { [key: string]: string[] },
  categoryAttributesData: AttributeCategory[]
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
const filtersToBrandIds = (
  selectedBrandNames: string[],
  brandData: {
    id: number;
    name: string;
  }[]
): number[] => {
  if (!selectedBrandNames || selectedBrandNames.length === 0) {
    return [];
  }
  const brandIds = selectedBrandNames
    .map((selectedName) => {
      const foundBrand = brandData.find(
        (brand) => brand.name.toLowerCase() === selectedName.toLowerCase()
      );
      return foundBrand ? foundBrand.id : null;
    })
    .filter((id): id is number => id !== null);
  return brandIds;
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
  const { data: category } = useGetCategoryFilter(categoryId ? +categoryId : 0);
  const filterData = formatToFilterData((category?.attributes as any) || []);
  const [page, setPage] = useState(1);

  const initialFilters: { [key: string]: string[] } = {};
  filterData.forEach((f) => {
    initialFilters[f.field] = [];
  });
  // THÊM BRANDS VÀO STATE KHỞI TẠO BẰNG TAY
  initialFilters["brands"] = [];
  const [filters, setFilters] = useState<{ [key: string]: string[] }>(
    initialFilters
  );
  // Thêm state cho Price Range
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 25]);

  const handleFilterChange = (
    field: string,
    value: string,
    checked: boolean
  ) => {
    setFilters((prev) => {
      // Đảm bảo lấy đúng mảng giá trị của field hiện tại
      const prevValues = prev[field] || [];
      const newValues = checked
        ? [...prevValues, value]
        : prevValues.filter((v) => v !== value);

      return { ...prev, [field]: newValues };
    });
  };
  const queryParams: ProductQueryParams = useMemo(() => {
    const attributeCategoryIds = filtersToAttributeCategoryIds(
      filters,
      (category?.attributes as any) || []
    );
    const brandIds = filtersToBrandIds(
      filters["brands"],
      category?.brands || []
    );
    return {
      sortBy: sort.sortBy,
      sortOrder: sort.sortOrder,
      search: debouncedSearchTerm,
      categoryId: category?.id || 0,
      brandIds,
      attributeCategoryIds,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      page, // 👈 thêm dòng này
      limit: 9, // giới hạn mỗi trang 9 sản phẩm
    };
  }, [filters, page, priceRange, category, debouncedSearchTerm, sort]);
  const { data: products, isLoading } = useProducts(queryParams);
  const handlePageChange = (newPage: number) => {
    const totalPages = products?.pagination?.total ?? 1;
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  return (
    <div>
      <div className="bg-[#F6F7F8]">
        <div className="w-[1240px] mx-auto py-[16px]">
          <MyBreadcrumb data={[pathname.split("/")[3], category?.name || ""]} />
        </div>
      </div>
      <div className="w-[1240px] mx-auto py-[50px] flex gap-[30px]">
        <div className="w-[270px] flex flex-col gap-[30px]">
          {filterData.map((filter) => {
            return (
              <FilterGroup
                key={filter.field}
                field={filter.field}
                values={filter.values}
                selectedValues={filters[filter.field] || []}
                onChange={handleFilterChange}
              />
            );
          })}
          <PriceGroup range={priceRange} setRange={setPriceRange} />
          {/* THÊM FILTERGROUP BRANDS THỦ CÔNG */}
          <FilterGroup
            field="brands" // Quan trọng: Phải khớp với key trong state 'filters'
            values={category?.brands.map((brand) => brand.name) || []}
            selectedValues={filters["brands"] || []}
            onChange={handleFilterChange}
          />
          {/* <LoadMoreButton /> */}
        </div>

        <div className="flex-1 flex flex-col gap-[30px]">
          <div className="bg-[#F6F7F8] rounded-[10px] p-[20px]">
            <div className="flex justify-between">
              <SearchInput
                value={searchInput}
                onChange={(value) => setSearchInput(value)}
              />
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
          <div className="relative bg-[#40BFFF] opacity-80 pl-[100px] py-[30px] rounded-[10px] text-white h-[300px]">
            <p className="text-[30px] font-medium">{category?.name}</p>
            <p className="w-[370px] mt-[14px]">{category?.description}</p>
            <Image
              height={400}
              width={400}
              alt={category?.name || ""}
              src={category?.image || ""}
              className="w-[400px] h-[400px]  object-contain absolute top-0 right-0"
            />
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-3 gap-y-3 gap-x-5">
              {products?.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
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
