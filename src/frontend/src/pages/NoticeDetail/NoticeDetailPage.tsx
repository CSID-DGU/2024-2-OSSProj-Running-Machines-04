import { ReactComponent as BackIcon } from "@/assets/icons/BackIcon.svg";
import Spinner from "@/components/common/Spinner";
import { useCrewNoticeDetailGet } from "@/hooks/useCrew";
import { useNavigate, useParams } from "react-router-dom";

const NoticeDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useCrewNoticeDetailGet(1, Number(id));

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data && (
          <>
            <div className="shadow-sm w-full flex justify-start p-4 mb-6">
              <BackIcon onClick={() => navigate("/crew")} />
            </div>
            <div className="mb-24 px-8">
              <div className="text-[#444] font-semibold text-[32px]">
                {data.title}
              </div>
              <div className="text-[#515151] text-[12px]">
                작성자: {data.author}
                {" | "}
                {data.createdDate?.slice(0, 10) || ""}
              </div>
              <div className="text-[#444] text-[18px] mt-8 leading-8">
                {data.content}
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default NoticeDetailPage;
