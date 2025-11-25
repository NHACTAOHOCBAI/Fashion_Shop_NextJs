interface NormalButtonProps {
  children: React.ReactNode;
}
const NormalButton = ({ children }: NormalButtonProps) => {
  return (
    <div className="bg-[#F6F7F8] px-[18px] py-[6px] rounded-[4px] cursor-pointer duration-300 active:scale-90 select-none hover:opacity-80 active:bg-gray-200">
      {children}
    </div>
  );
};
export default NormalButton;
