import Calendar from "@/components/common/Calendar";
import RecentRunningCard from "@/components/common/RecentRunningCard";
import CrewMemberDetailTitle from "@/components/crewMemberDetail/CrewMemberDetailTitle";
import CrewMemberTitle from "@/components/crewMembers/CrewMemberTitle";

const CrewMemberDetailPage = () => {
  return (
    <div className="mb-24">
      <CrewMemberTitle />
      <CrewMemberDetailTitle />
      <Calendar />
      <RecentRunningCard />
    </div>
  );
};

export default CrewMemberDetailPage;
