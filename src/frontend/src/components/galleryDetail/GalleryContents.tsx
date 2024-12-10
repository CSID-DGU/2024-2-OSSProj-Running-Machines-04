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
                  {commentsData.length > 0 ? (
                    commentsData.map((comment) => (
                      <GalleryComment comment={comment} />
                    ))
                  ) : (
                    <p className="text-[#444] px-3">댓글이 아직 없습니다</p>
                  )}
                </>
              </BottomSheet>
            )}
            <div>
              <div className="max-h-[50vh] max-w-screen overflow-x-scroll flex justify-center">
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
                <span className="text-[20px] font-bold mr-3 mb-3 text-[#444]">
                  {data.authorNickName}
                </span>
                {data.content}
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default GalleryContents;
