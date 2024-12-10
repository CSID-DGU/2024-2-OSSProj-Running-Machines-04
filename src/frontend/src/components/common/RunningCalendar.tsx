import CalendarImg from "@/assets/images/calendar.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/styles/RunningCalendar.css";
import { MypageCalendarResponse } from "@/types/mypage";

type RunningCalendarProps = {
  runningData: MypageCalendarResponse[];
};

const RunningCalendar = ({ runningData = [] }: RunningCalendarProps) => {
  // 날짜에 해당하는 거리 가져오기
  const getDistanceByDate = (date: Date): number => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);

    const dateString = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD 포맷
    const record = runningData.find((d) => d.date === dateString);
    return record?.totalDistance || 0.0;
  };

  // 타일 스타일링
  const tileContent = ({ date }: { date: Date }) => {
    const distance = getDistanceByDate(date);

    if (distance > 0) {
      return (
        <div className="highlight flex justify-center items-center">
          <p className="text-end text-[#444] font-bold">
            {distance.toFixed(2)} <span className="text-[0.75rem]">km</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="my-12 flex justify-center">
      <Calendar
        tileContent={tileContent} // 날짜별 커스터마이징
        className="running-calendar"
      />
    </div>
  );
};

export default RunningCalendar;
