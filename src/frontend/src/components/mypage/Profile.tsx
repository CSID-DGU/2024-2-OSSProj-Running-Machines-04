import { useUserInfoGet } from "@/hooks/useMypage";
import { ReactComponent as SettingIcon } from "@/assets/icons/SettingIcon.svg";
import Spinner from "../common/Spinner";

const Profile = () => {
  // const { data, isLoading } = useUserInfoGet();
  const data = {
    nickName: "러닝짱",
    profileImageUrl:
      "https://ready2run.s3.ap-northeast-2.amazonaws.com/profile/3/9225a4c2-706c-4eeb-81f4-efe8f085e0cb.jpeg",
    elevation: "HIGH",
    convenience: "MEDIUM",
    track: "MEDIUM",
  };
  const isLoading = false;

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data && (
          <div className="relative w-full p-8 gap-8 bg-[#F3F3F3] flex items-center">
            <SettingIcon className="absolute top-3 right-3 cursor-pointer" />
            <div className="w-[8rem] h-[8rem] rounded-full overflow-hidden">
              <img
                src={data.profileImageUrl}
                alt="프로필"
                className="bg-white w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow flex flex-col gap-3">
              <div className="text-black font-semibold text-[18px]">
                {data.nickName}
              </div>
              <div className="flex flex-col gap-2 p-2 rounded shadow-sm bg-white">
                <div className="text-[8px] font-semibold text-black flex justify-between">
                  <p>나의 러닝 스타일</p>
                  <p className="cursor-pointer">〉</p>
                </div>
                <div className="text-black text-[8px] font-light">
                  <p>{`경사있는 길을 ${
                    data.convenience == "HIGH" ? "즐겨요" : "즐기지 않아요"
                  }!`}</p>
                  <p>{`편의시설이 있는 길을 ${
                    data.convenience == "HIGH" ? "선호해요" : "선호하지 않아요"
                  }!`}</p>
                  <p>{`트랙코스를 ${
                    data.track == "HIGH" ? "선호해요" : "선호하지 않아요"
                  }!`}</p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Profile;
