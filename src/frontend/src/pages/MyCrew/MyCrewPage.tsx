import Spinner from "@/components/common/Spinner";
import { ReactComponent as WriteIcon } from "@/assets/icons/WriteIcon.svg";
import ContentsSection from "@/components/myCrew/ContentsSection";
import MyCrewProfile from "@/components/myCrew/MyCrewProfile";
import { useCrewGalleryGet, useCrewNoticeGet } from "@/hooks/useCrew";
import { useNavigate } from "react-router-dom";

const MyCrewPage = () => {
  const navigate = useNavigate();

  const { isLoading: galleryLoading } = useCrewGalleryGet(1);
  const { data, isLoading: noticeLoading } = useCrewNoticeGet(1);
  return (
    <>
      {galleryLoading || noticeLoading ? (
        <Spinner />
      ) : (
        data && (
          <div className="mb-24">
            <WriteIcon
              className="z-10 fixed bottom-[12%] right-[6%] cursor-pointer"
              onClick={() => navigate("/crew/write")}
            />
            <MyCrewProfile profileUrl={data.crewProfileImage} />
            <ContentsSection />
          </div>
        )
      )}
    </>
  );
};

export default MyCrewPage;
