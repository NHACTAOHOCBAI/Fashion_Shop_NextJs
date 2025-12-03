const Content = ({
  onSortChange,
}: {
  onSortChange: (sortBy: string, sortOrder: "ASC" | "DESC") => void;
}) => {
  return (
    <div>
      <div
        onClick={() => {
          onSortChange("createdAt", "DESC");
        }}
        className="text-[18px] text-gray-700 hover:text-[#40BFFF] transition-colors font-normal cursor-pointer"
      >
        Latest
      </div>
      <div
        onClick={() => {
          onSortChange("price", "DESC");
        }}
        className="text-[18px] text-gray-700 hover:text-[#40BFFF] transition-colors font-normal cursor-pointer"
      >
        Price: High - Low
      </div>
      <div
        onClick={() => {
          onSortChange("price", "ASC");
        }}
        className="text-[18px] text-gray-700 hover:text-[#40BFFF] transition-colors font-normal cursor-pointer"
      >
        Price: Low - High
      </div>
    </div>
  );
};
interface SortByButtonProps {
  onSortChange: (sortBy: string, sortOrder: "ASC" | "DESC") => void;
}
const SortByButton = ({ onSortChange }: SortByButtonProps) => {
  return (
    <SortByDropdown content={<Content onSortChange={onSortChange} />}>
      <div className="font-medium cursor-pointer select-none">SORT BY</div>
    </SortByDropdown>
  );
};
interface SortByDropdownProps {
  children: React.ReactNode;
  content: React.ReactNode;
}
const SortByDropdown = ({ children, content }: SortByDropdownProps) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div
        className="
          absolute z-10 
          bg-white rounded-[10px] border-[#FAFAFB] border-[2px] p-[15px] 
          shadow-lg w-[200px] 
          right-0  
          opacity-0 invisible 
          group-hover:opacity-100 group-hover:visible
          transition-opacity duration-400
          pointer-events-none group-hover:pointer-events-auto
        "
      >
        {content}
      </div>
    </div>
  );
};
export default SortByButton;
