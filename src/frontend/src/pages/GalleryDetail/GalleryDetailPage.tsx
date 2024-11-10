import { ReactComponent as BackIcon } from "@/assets/icons/BackIcon.svg";
import ProfileCard from "@/components/common/ProfileCard";
import GalleryContents from "@/components/galleryDetail/GalleryContents";
import { useNavigate } from "react-router-dom";

const GalleryDetailPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="shadow-sm w-full flex justify-start p-4">
        <BackIcon onClick={() => navigate("/crew")} />
      </div>
      <ProfileCard />
      <GalleryContents />
    </div>
  );
};

export default GalleryDetailPage;
