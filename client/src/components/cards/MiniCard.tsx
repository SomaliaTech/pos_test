import type React from "react";

type ICard = {
  title: string;
  icon: React.ReactNode;
  number: number;
  footerNum: number;
  descriptions: string;
};
const MiniCard = ({ title, icon, number, descriptions }: ICard) => {
  console.log("title", title, "descriptions", descriptions);
  return (
    <div className="bg-[#F9FBFA] py-5 px-5 rounded-lg w-[100%]">
      <div className="flex items-start justify-between">
        <h1 className="text-[#000] text-lg font-semibold tracking-wide">
          {title}
        </h1>
        <button
          className={`${
            title === "Total Order" ? "bg-[#02ca3a]" : "bg-[#f6b100]"
          } p-3 rounded-lg text-[#000] text-2xl`}
        >
          {icon}
        </button>
      </div>
      <div>
        <h1 className="text-[#000] text-4xl font-bold mt-5">
          {title === "Total Orders" ? `${number}` : number}
        </h1>
        <h1 className="text-[#000] text-lg mt-2">
          <span className="text-[#02ca3a]">{descriptions}</span>
        </h1>
      </div>
    </div>
  );
};

export default MiniCard;
