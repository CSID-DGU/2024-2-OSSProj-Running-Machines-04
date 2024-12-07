import { ReactComponent as BackIcon } from "@/assets/icons/BackIcon.svg";
import ProfileCard from "@/components/common/ProfileCard";
import GalleryContents from "@/components/galleryDetail/GalleryContents";
import {
  useCrewGalleryDetailCommentsGet,
  useCrewGalleryDetailGet,
} from "@/hooks/useCrew";
import { useNavigate } from "react-router-dom";

const GalleryDetailPage = () => {
  const navigate = useNavigate();
  const { data } = useCrewGalleryDetailGet(1, 1);
  const { data: comments } = useCrewGalleryDetailCommentsGet(1, 1);

  return (
    <div>
      <div className="shadow-sm w-full flex justify-start p-4">
        <BackIcon onClick={() => navigate("/crew")} />
      </div>
      <ProfileCard />
      {comments && <GalleryContents comments={comments} />}
    </div>
  );
};

export default GalleryDetailPage;
