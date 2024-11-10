import DistanceRanking from "@/components/home/DistanceRanking";
import FaceRanking from "@/components/home/FaceRanking";
import HomeRecord from "@/components/home/HomeRecord";

const HomePage = () => {
  return (
    <div>
      <HomeRecord />
      <DistanceRanking />
      <FaceRanking />
    </div>
  );
};

export default HomePage;
