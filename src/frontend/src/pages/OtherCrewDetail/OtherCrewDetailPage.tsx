import Spinner from "@/components/common/Spinner";
import OtherCrewContents from "@/components/otherCrewDetail/OtherCrewContents";
import OtherCrewProfile from "@/components/otherCrewDetail/OtherCrewProfile";
import { useCrewGalleryGet, useCrewNoticeGet } from "@/hooks/useCrew";
import { useParams } from "react-router-dom";

const OtherCrewDetailPage = () => {
  const { id } = useParams();
  const { data: galleryData, isLoading: galleryLoading } = useCrewGalleryGet(
    Number(id)
  );
  const { data: noticeData, isLoading: noticeLoading } = useCrewNoticeGet(
    Number(id)
  );

  return (
    <>
      {galleryLoading || noticeLoading ? (
        <Spinner />
      ) : (
        galleryData &&
        noticeData && (
          <div className="mb-24">
            <OtherCrewProfile data={noticeData} />
            <OtherCrewContents
              galleryData={galleryData}
              noticeData={noticeData}
            />
          </div>
        )
      )}
    </>
  );
};

export default OtherCrewDetailPage;
