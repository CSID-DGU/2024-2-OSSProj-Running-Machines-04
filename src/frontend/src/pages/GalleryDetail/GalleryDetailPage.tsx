import { ReactComponent as BackIcon } from "@/assets/icons/BackIcon.svg";
import ProfileCard from "@/components/common/ProfileCard";
import Spinner from "@/components/common/Spinner";
import GalleryContents from "@/components/galleryDetail/GalleryContents";
import {
  useCrewGalleryDetailCommentsGet,
  useCrewGalleryDetailGet,
} from "@/hooks/useCrew";
import { useNavigate, useParams } from "react-router-dom";

const GalleryDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading } = useCrewGalleryDetailGet(1, Number(id));
  const { isLoading: commentsLoading } = useCrewGalleryDetailCommentsGet(
    1,
    Number(id)
  );

  return (
    <>
      {isLoading || commentsLoading ? (
        <Spinner />
      ) : (
        <div>
          <div className="shadow-sm w-full flex justify-start p-4">
            <BackIcon onClick={() => navigate("/crew")} />
          </div>
          <ProfileCard />
          <GalleryContents />
        </div>
      )}
    </>
  );
};

export default GalleryDetailPage;
