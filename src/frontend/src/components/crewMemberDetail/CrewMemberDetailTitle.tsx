import { Member } from "@/types/crew";

type CrewMemberDetailTitleProps = {
  user: Member | undefined;
};

const CrewMemberDetailTitle = ({ user }: CrewMemberDetailTitleProps) => {
  return (
    <>
      {user && (
        <div className="bg-[#f3f3f3] flex items-center justify-between gap-5 px-8 py-10 mb-10">
          <div>
            <div className="text-[12px] text-[#515151]">
              가입기간{" "}
              <span className="bg-[#DBF2FF] rounded-md px-[12px]">
                {user.membershipDuration}
              </span>
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-[22px] text-[#444] font-bold">
                {user.name} 님의 러닝 기록
              </div>
            </div>
          </div>
          <div className="w-[64px] h-[64px] rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={user.profileUrl}
              alt="profile"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CrewMemberDetailTitle;
