import Calendar from "@/components/common/Calendar";
import Spinner from "@/components/common/Spinner";
import CrewMemberDetailTitle from "@/components/crewMemberDetail/CrewMemberDetailTitle";
import CrewMemberTitle from "@/components/crewMembers/CrewMemberTitle";
import RecentRecord from "@/components/mypage/RecentRecord";
import { useCrewMemberDetailGet } from "@/hooks/useCrew";
import { Member } from "@/types/crew";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CrewMemberDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useCrewMemberDetailGet(1, Number(id), 2024, 12);
  const [currentUser, setCurrentUser] = useState<Member>();

  useEffect(() => {
    if (data?.members) {
      const member = data.members.find(
        (member) => member.userId === Number(id)
      );
      if (member) {
        setCurrentUser(member);
      }
    }
  }, [data, id]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data && (
          <div className="mb-24">
            <CrewMemberTitle />
            <CrewMemberDetailTitle user={currentUser} />
            <Calendar />
            {data.recentRuns.map((record) => (
              <RecentRecord record={record} />
            ))}
          </div>
        )
      )}
    </>
  );
};

export default CrewMemberDetailPage;
