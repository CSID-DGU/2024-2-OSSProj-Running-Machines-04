import DistanceRanking from "@/components/home/DistanceRanking";
import FaceRanking from "@/components/home/FaceRanking";
import HomeRecord from "@/components/home/HomeRecord";

const HomePage = () => {
  return (
    <div className="mb-24">
      <HomeRecord />
      <DistanceRanking />
      <FaceRanking />
    </div>
  );
};

export default HomePage;
