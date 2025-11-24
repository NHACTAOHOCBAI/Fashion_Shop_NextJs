import React from "react";
interface MyBreadcumbProps {
  data: string[];
}
const MyBreadcrumb = ({ data }: MyBreadcumbProps) => {
  // Kiểm tra nếu không có dữ liệu thì không render gì
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="">
      {data.map((item, index) => {
        const isLast = index === data.length - 1;

        return (
          <React.Fragment key={index}>
            <span
              className={`
                text-[16px] font-medium 
                ${isLast ? "text-[#40BFFF]" : "cursor-pointer"}
              `}
            >
              {item}
            </span>
            {!isLast && <span className="mx-2 text-[#C1C8CE]">/</span>}
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default MyBreadcrumb;
