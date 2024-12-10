import Calendar from "@/components/common/RunningCalendar";
import Spinner from "@/components/common/Spinner";
import Profile from "@/components/mypage/Profile";
import RecentRecord from "@/components/mypage/RecentRecord";
import Stats from "@/components/mypage/Stats";
import { useCalendarGet, useRecentStatsGet } from "@/hooks/useMypage";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useRecentStatsGet();
  const { data: calendar } = useCalendarGet(2024, 12);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        data && (
          <div className="mb-20">
            <Profile />
            <Calendar runningData={calendar} />
            <h1 className="text-[24px] font-semibold px-10 mt-12">최근 기록</h1>
            {data.map((record) => (
              <RecentRecord record={record} />
            ))}
            <Stats />
            <p
              onClick={() => navigate("/signin")}
              className="text-end underline mx-10 mt-10 text-gray-400"
            >
              로그인
            </p>
          </div>
        )
      )}
    </>
  );
};

export default MyPage;
