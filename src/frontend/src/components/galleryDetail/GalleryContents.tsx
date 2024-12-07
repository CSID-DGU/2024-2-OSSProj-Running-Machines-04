import { ReactComponent as HeartIcon } from "@/assets/icons/HeartIcon.svg";
import { ReactComponent as CommentIcon } from "@/assets/icons/CommentIcon.svg";
import { useState } from "react";
import BottomSheet from "@/components/record/BottomSheet";
import GalleryComment from "../common/GalleryComment";
import {
  useCrewGalleryDetailCommentsGet,
  useCrewGalleryDetailGet,
} from "@/hooks/useCrew";
import { useParams } from "react-router-dom";
import Spinner from "../common/Spinner";

const GalleryContents = () => {
  const { id } = useParams();
  const [isScrapped, setIsScrapped] = useState(false);
  const [commentSheet, setCommentSheet] = useState(false);

  const { data, isLoading } = useCrewGalleryDetailGet(1, Number(id));
  const { data: commentsData, isLoading: commentsLoading } =
    useCrewGalleryDetailCommentsGet(1, Number(id));

  return (
    <>
      {isLoading || commentsLoading ? (
        <Spinner />
      ) : (
        data && (
          <>
            {commentSheet && commentsData && (
              <BottomSheet setOpenSheet={setCommentSheet}>
                <>
                  {commentsData.map((comment) => (
                    <GalleryComment comment={comment} />
                  ))}
                </>
              </BottomSheet>
            )}
            <div>
              <div className="max-h-[50vh] max-w-screen overflow-scroll">
                {data.imageUrls.map((image) => (
                  <img className="" src={image} alt="갤러리 사진" />
                ))}
              </div>
              <div className="flex justify-between px-4 py-2">
                <HeartIcon
                  onClick={() => setIsScrapped(!isScrapped)}
                  fill={isScrapped ? "#F17171" : "#fff"}
                  stroke={isScrapped ? "#F17171" : "#afafaf"}
                />
                <CommentIcon onClick={() => setCommentSheet(true)} />
              </div>
              <div className="px-6">
                <span className="text-[18px] font-bold">러미사</span> 오늘은
                새로운 크루원들과 러닝을 했습니다! 서로의 실력을 알아가며 부족한
                점을 서로 채워주는 모습이 참 보기 좋네요~ 앞으로도 활발한 활동
                기대하겠습니다!
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default GalleryContents;
