import { Search } from "lucide-react";

const SearchInput = () => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-[400px] bg-white px-[18px] py-[10px] rounded-[32px] focus:outline-none pr-[50px]"
        placeholder="Search..."
      />
      <div className="absolute top-[12px] right-[20px]">
        <Search />
      </div>
    </div>
  );
};

export default SearchInput;
