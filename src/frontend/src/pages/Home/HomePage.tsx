import DistanceRanking from "@/components/home/DistanceRanking";
import HomeRecord from "@/components/home/HomeRecord";
import PaceRanking from "@/components/home/PaceRanking";

const HomePage = () => {
  return (
    <div className="mb-24">
      <HomeRecord />
      <DistanceRanking />
      <PaceRanking />
    </div>
  );
};

export default HomePage;
