import React, { Dispatch, SetStateAction } from "react";

type crewWriteHeaderProps = {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
};

const CrewWriteHeader = ({ onSubmit, type, setType }: crewWriteHeaderProps) => {
  return (
    <div>
      <div className="flex items-center justify-between py-5 px-8 border-b border-[#D9D9D9]">
        <div className="cursor-pointer text-[18px] text-[#515151]">뒤로</div>
        <div className="text-[18px] font-bold">게시물 작성</div>
        <div
          onClick={onSubmit}
          className="cursor-pointer text-[18px] text-[#000]"
        >
          게시
        </div>
      </div>

      <div className="flex gap-8 text-[15px] py-5 px-8">
        <span
          className={`cursor-pointer font-semibold ${
            type === "gallery" ? "text-[#000]" : "text-[#999]"
          }`}
          onClick={() => setType("gallery")}
        >
          갤러리
        </span>
        <span
          className={`cursor-pointer font-semibold ${
            type === "notice" ? "text-[#000]" : "text-[#999]"
          }`}
          onClick={() => setType("notice")}
        >
          공지사항
        </span>
      </div>
    </div>
  );
};

export default CrewWriteHeader;
