import CrewMemberCard from "@/components/crewMembers/CrewMemberCard";
import { useCrewMemberGet } from "@/hooks/useCrew";
import Spinner from "../common/Spinner";

const CrewMemberSection = () => {
  const { data, isLoading } = useCrewMemberGet(1);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data && (
          <div className="mx-6 bg-[#f4f4f4] rounded-md">
            {data.members.map((member) => (
              <CrewMemberCard key={member.userId} member={member} />
            ))}
          </div>
        )
      )}
    </>
  );
};

export default CrewMemberSection;
