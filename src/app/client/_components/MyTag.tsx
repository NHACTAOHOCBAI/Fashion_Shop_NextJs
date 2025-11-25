const MyTag = ({ value }: { value: React.ReactNode }) => {
  return (
    <div className="bg-[#FAFAFB] border-[#F6F7F8] border-[1px] text-[14px] font-light px-[18px] py-[4px] rounded-[5px]">
      {value}
    </div>
  );
};
export default MyTag;
