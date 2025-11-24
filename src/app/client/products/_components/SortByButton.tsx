const Content = () => {
  return (
    <div>
      <div className="text-[18px] text-gray-700 hover:text-[#40BFFF] transition-colors font-normal cursor-pointer">
        Latest
      </div>
      <div className="text-[18px] text-gray-700 hover:text-[#40BFFF] transition-colors font-normal cursor-pointer">
        Price: High - Low
      </div>
      <div className="text-[18px] text-gray-700 hover:text-[#40BFFF] transition-colors font-normal cursor-pointer">
        Price: Low - High
      </div>
    </div>
  );
};
const SortByButton = () => {
  return (
    <SortByDropdown content={<Content />}>
      <div className="font-medium">SORT BY</div>
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
