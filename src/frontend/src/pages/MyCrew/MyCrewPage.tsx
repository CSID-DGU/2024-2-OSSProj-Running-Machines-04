import Spinner from "@/components/common/Spinner";
import ContentsSection from "@/components/myCrew/ContentsSection";
import MyCrewProfile from "@/components/myCrew/MyCrewProfile";
import { useCrewGalleryGet, useCrewNoticeGet } from "@/hooks/useCrew";

const MyCrewPage = () => {
  const { isLoading: galleryLoading } = useCrewGalleryGet(1);
  const { isLoading: noticeLoading } = useCrewNoticeGet(1);
  return (
    <>
      {galleryLoading || noticeLoading ? (
        <Spinner />
      ) : (
        <div className="mb-24">
          <MyCrewProfile />
          <ContentsSection />
        </div>
      )}
    </>
  );
};

export default MyCrewPage;
