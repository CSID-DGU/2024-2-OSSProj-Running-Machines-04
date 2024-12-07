import Calendar from "@/components/common/Calendar";
import Spinner from "@/components/common/Spinner";
import Profile from "@/components/mypage/Profile";
import RecentRecord from "@/components/mypage/RecentRecord";
import Stats from "@/components/mypage/Stats";
import { useRecentStatsGet } from "@/hooks/useMypage";

const MyPage = () => {
  const { data, isLoading } = useRecentStatsGet();

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data && (
          <div className="mb-32">
            <Profile />
            <Calendar />
            <h1 className="text-[24px] font-semibold px-10 mt-12">최근 기록</h1>
            {data.map((record) => (
              <RecentRecord record={record} />
            ))}
            <Stats />
          </div>
        )
      )}
    </>
  );
};

export default MyPage;
