import OtherCrewCard from "@/components/otherCrew/OtherCrewCard";
import { ReactComponent as BackIcon } from "@/assets/icons/BackIcon.svg";
import { useNavigate } from "react-router-dom";

const OtherCrewPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="shadow-sm w-full flex justify-start p-4">
        <BackIcon onClick={() => navigate(-1)} />
      </div>
      <OtherCrewCard />
      <OtherCrewCard />
      <OtherCrewCard />
      <OtherCrewCard />
      <OtherCrewCard />
      <OtherCrewCard />
      <OtherCrewCard />
    </div>
  );
};

export default OtherCrewPage;
