import { useNavigate } from "react-router-dom";

const CrewMemberCard = () => {
  const naavigate = useNavigate();

  return (
    <div
      onClick={() => naavigate("/crew/members/1")}
      className="flex items-center gap-5 px-8 py-5"
    >
      <div className="w-[64px] h-[64px] rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src="https://blog.malcang.com/wp-content/uploads/2024/03/1-1.png"
          alt="profile"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="text-[16px] text-[#444] font-semibold">머신머신</div>
        <div className="text-[12px] text-[#515151]">
          가입기간 <span className="bg-[#DBF2FF] rounded-md px-[12px]">9m</span>
        </div>
      </div>
    </div>
  );
};

export default CrewMemberCard;
