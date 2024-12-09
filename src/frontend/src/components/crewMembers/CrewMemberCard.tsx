import { Member } from "@/types/crew";
import { ReactComponent as CourseCTA } from "@/assets/icons/CourseCTA.svg";
import { useNavigate } from "react-router-dom";

type CrewMemberCardProps = {
  member: Member;
};

const CrewMemberCard = ({ member }: CrewMemberCardProps) => {
  const naavigate = useNavigate();

  return (
    <div className="flex justify-between items-center gap-5 px-6 py-5">
      <div className="flex items-center gap-4">
        <div className="w-[64px] h-[64px] rounded-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={member.profileUrl}
            alt="profile"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="text-[16px] text-[#444] font-semibold">
            {member.name}
          </div>
          <div className="text-[12px] text-[#515151]">
            가입기간{" "}
            <span className="bg-[#DBF2FF] rounded-md px-[12px]">
              {member.membershipDuration}
            </span>
          </div>
        </div>
      </div>
      <CourseCTA onClick={() => naavigate(`/crew/members/${member.userId}`)} />
    </div>
  );
};

export default CrewMemberCard;
