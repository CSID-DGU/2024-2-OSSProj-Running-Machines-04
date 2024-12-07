import { useCrewGalleryDetailGet } from "@/hooks/useCrew";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

const ProfileCard = () => {
  const { id } = useParams();
  const { data, isLoading } = useCrewGalleryDetailGet(1, Number(id));

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data && (
          <div className="flex items-center gap-3 p-4">
            <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={data.authorProfileUrl}
                alt="프로필 사진"
              />
            </div>
            <div>
              <div className="text-[#444] text-[18px] font-medium">
                {data.authorNickName}
              </div>
              <div className="text-[#515151] text-[10px]">
                {data.createdAt.slice(0, 10) || ""}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default ProfileCard;
