import Spinner from "@/components/common/Spinner";
import ContentsSection from "@/components/myCrew/ContentsSection";
import MyCrewProfile from "@/components/myCrew/MyCrewProfile";
import OtherCrewProfile from "@/components/otherCrewDetail/OtherCrewProfile";
import { useCrewGalleryGet, useCrewNoticeGet } from "@/hooks/useCrew";
import { useParams } from "react-router-dom";

const OtherCrewDetailPage = () => {
  const { id } = useParams();
  const { isLoading: galleryLoading } = useCrewGalleryGet(Number(id));
  const { isLoading: noticeLoading } = useCrewNoticeGet(Number(id));

  return (
    <>
      {galleryLoading || noticeLoading ? (
        <Spinner />
      ) : (
        <div className="mb-24">
          <OtherCrewProfile />
          <ContentsSection />
        </div>
      )}
    </>
  );
};

export default OtherCrewDetailPage;
