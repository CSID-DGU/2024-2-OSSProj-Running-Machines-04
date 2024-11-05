import KakaoMap from "@/components/common/KakaoMap";
import { ReactComponent as PlayIcon } from "@/assets/images/play.svg";
import HomeCategory from "@/components/home/HomeCategory";
import Searchbar from "@/components/home/Searchbar";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Searchbar />
      <HomeCategory />
      <KakaoMap />
      <PlayIcon className="fixed bottom-[20vh] z-50" />
    </div>
  );
};

export default HomePage;
