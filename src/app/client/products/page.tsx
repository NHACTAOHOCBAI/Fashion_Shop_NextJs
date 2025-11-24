"use client";
import {
  FilterGroup,
  PriceGroup,
} from "@/app/client/products/_components/FilterGroup";
import LoadMoreButton from "@/app/client/products/_components/LoadMoreButton";
import { CustomPagination } from "@/app/client/products/_components/MyPagination";
import ProductCard from "@/app/client/products/_components/ProductCard";
import SearchInput from "@/app/client/products/_components/SearchInput";
import SortByButton from "@/app/client/products/_components/SortByButton";
import { useState } from "react";
const filterData = [
  {
    field: "Sizes",
    values: ["XL", "L", "M", "S"],
  },
];

const Products = () => {
  const [page, setPage] = useState(1);
  const totalPages = 10; // Ví dụ có tổng cộng 10 trang

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
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

  return (
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
          values={["gucci", "Louis Vuitton", "Adidas", "Nike"]}
          selectedValues={filters["brands"] || []}
          onChange={handleFilterChange}
        />
        <LoadMoreButton />
      </div>

      <div className="flex-1 flex flex-col gap-[30px]">
        <div className="bg-[#F6F7F8] rounded-[10px] p-[20px]">
          <div className="flex justify-between">
            <SearchInput />
            <SortByButton />
          </div>
          <p className="text-[18px] mt-[10px]">
            <span className="font-medium">29</span> items found
          </p>
        </div>
        <Introduce />
        <div className="grid grid-cols-3 gap-y-3 gap-x-5">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        <div className="flex flex-col items-center gap-4 p-8">
          <CustomPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};
const Introduce = () => {
  return (
    <div className="bg-[#40BFFF] opacity-80 pl-[100px] py-[30px] rounded-[10px] text-white h-[300px]">
      <p className="text-[30px] font-medium">Men’s Shoes</p>
      <p className="w-[370px] mt-[14px]">
        Stylish and comfortable men’s shoes for every occasion. From casual
        sneakers to formal dress shoes, find the perfect pair to match your
        everyday style.
      </p>
    </div>
  );
};
export default Products;
