import { Search } from "lucide-react";
interface SearchInputProps {
  value: string;
  onChange: (newValue: string) => void;
}
const SearchInput = ({ onChange, value }: SearchInputProps) => {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type="text"
        className="
          w-[400px] 
          bg-white 
          px-[18px] 
          py-[10px] 
          rounded-[32px] 
          focus:outline-none 
          pr-[50px]
          border border-transparent /* Border mặc định */
          transition duration-200 ease-in-out /* Thêm chuyển động mượt mà */
          shadow-md /* Shadow nhẹ mặc định */
          hover:border-[#40BFFF]
          hover:shadow-lg /* Shadow lớn hơn khi hover */
          
          focus:ring-2 focus:ring-[#40BFFF] focus:ring-opacity-50 /* Hiệu ứng Ring khi focus */
          focus:border-[#40BFFF]
        "
        placeholder="Search..."
      />
      <div className="absolute top-[12px] right-[20px] text-gray-400">
        <Search />
      </div>
    </div>
  );
};

export default SearchInput;
