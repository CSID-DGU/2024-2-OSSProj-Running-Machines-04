import { ReactComponent as BackIcon } from "@/assets/icons/BackIcon.svg";
import CommentInput from "@/components/common/CommentInput";
import GalleryComment from "@/components/common/GalleryComment";
import ProfileCard from "@/components/common/ProfileCard";
import Spinner from "@/components/common/Spinner";
import GalleryContents from "@/components/galleryDetail/GalleryContents";
import {
  useCrewGalleryCommentsPost,
  useCrewGalleryDetailCommentsGet,
  useCrewGalleryDetailGet,
} from "@/hooks/useCrew";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GalleryDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [comment, setComment] = useState("");

  const { mutate } = useCrewGalleryCommentsPost(1, Number(id), comment);

  const handleCommentSubmit = () => {
    console.log(comment);
    mutate();
  };

  const { isLoading } = useCrewGalleryDetailGet(1, Number(id));
  const { data, isLoading: commentsLoading } = useCrewGalleryDetailCommentsGet(
    1,
    Number(id)
  );

  return (
    <>
      {isLoading || commentsLoading ? (
        <Spinner />
      ) : (
        <div className="mb-24">
          <CommentInput
            comment={comment}
            setComment={setComment}
            onSubmit={handleCommentSubmit}
          />
          <div className="shadow-sm w-full flex justify-start p-4">
            <BackIcon onClick={() => navigate("/crew")} />
          </div>
          <ProfileCard />
          <GalleryContents />
          <div className="px-5 mt-10 border-t border-[#eee]">
            {data &&
              data.length > 0 &&
              data.map((comment) => <GalleryComment comment={comment} />)}
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryDetailPage;
