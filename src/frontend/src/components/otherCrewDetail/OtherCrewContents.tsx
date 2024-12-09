import { crewMenu } from "@/constants/crew";
import { ReactComponent as NoticeIcon } from "@/assets/icons/NoticeIcon.svg";
import { useState } from "react";
import NoticeCard from "@/components/myCrew/NoticeCard";
import GalleryCard from "@/components/myCrew/GalleryCard";
import { CrewGalleryResponse, CrewNoticeResponse } from "@/types/crew";

type OtherCrewContentsProps = {
  galleryData: CrewGalleryResponse;
  noticeData: CrewNoticeResponse;
};

const OtherCrewContents = ({
  galleryData,
  noticeData,
}: OtherCrewContentsProps) => {
  const [menu, setMenu] = useState<crewMenu>(crewMenu.NOTICE);

  return (
    <>
      <div>
        {/* 공지/갤러리 메뉴 선택 */}
        <div className="flex w-full">
          <div
            onClick={() => setMenu(crewMenu.NOTICE)}
            className={`w-[50%] flex justify-center items-center py-2 text-[14px] border-y border-[#444] ${
              menu === crewMenu.NOTICE
                ? "bg-[rgba(177,255,140,0.60)]"
                : "bg-white"
            }`}
          >
            공지
          </div>
          <div
            onClick={() => setMenu(crewMenu.GALLERY)}
            className={`w-[50%] flex justify-center items-center py-2 text-[14px] border-y border-[#444] ${
              menu === crewMenu.GALLERY
                ? "bg-[rgba(177,255,140,0.60)]"
                : "bg-white"
            }`}
          >
            갤러리
          </div>
        </div>
        {/* 필독 공지 섹션 */}
        {menu === crewMenu.NOTICE && (
          <div className="flex items-center h-[35px] text-[12px]">
            <div className="h-full w-[50px] flex justify-center items-center gap-1 bg-[#F3F3F3]">
              <NoticeIcon />
              필독
            </div>
            <div className="h-full flex justify-center items-center px-2.5">
              서울 집단 러닝 제한 구역 안내
            </div>
          </div>
        )}
        <div>
          {menu === crewMenu.NOTICE &&
            Array.isArray(noticeData.noticePost) &&
            noticeData.noticePost.length > 0 && (
              <div className="flex flex-wrap gap-3 p-5">
                {noticeData.noticePost.map((post) => (
                  <NoticeCard
                    post={post}
                    key={post.crewPostId}
                    crewName={noticeData.crewTitle}
                    otherCrew={true}
                  />
                ))}
              </div>
            )}
        </div>
        <div>
          {menu === crewMenu.GALLERY &&
            Array.isArray(galleryData.posts) &&
            galleryData.posts.length > 0 && (
              <div className="flex justify-center px-[0.5vw]">
                <div className="w-full flex flex-wrap justify-start items-start">
                  {galleryData.posts.map((post) => (
                    <GalleryCard
                      key={post.postId}
                      post={post}
                      otherCrew={true}
                    />
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
};

export default OtherCrewContents;
