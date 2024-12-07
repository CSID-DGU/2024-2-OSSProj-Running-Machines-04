import OtherCrewCard from "@/components/otherCrew/OtherCrewCard";
import { ReactComponent as BackIcon } from "@/assets/icons/BackIcon.svg";
import { useNavigate } from "react-router-dom";
import { useCrewGet } from "@/hooks/useCrew";

const OtherCrewPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useCrewGet();

  // 데이터가 없거나 로딩 중일 때의 처리
  if (isLoading) return <div>로딩 중</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <div>
      <div className="shadow-sm w-full flex justify-start p-4">
        <BackIcon onClick={() => navigate(-1)} className="cursor-pointer" />
      </div>

      {data &&
        data.length > 0 &&
        data.map((crew) => <OtherCrewCard key={crew.crewId} crew={crew} />)}
    </div>
  );
};

export default OtherCrewPage;
