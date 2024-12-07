import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSelectedCourseStore from "@/store/useSelectedCourseStore";

const AlertModal = () => {
  const [count, setCount] = useState(5);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const { selectedCourse } = useSelectedCourseStore();

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // 코스 미선택시 courseId 0으로 설정
      if (selectedCourse) {
        navigate(`/record/${selectedCourse.courseId}/running`);
        setVisible(false);
      } else {
        navigate(`/record/0/running`);
        setVisible(false);
      }
    }
  }, [count, selectedCourse, navigate]);

  if (!visible) return null;

  return (
    <div className="z-[100] fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.6)]">
      <div className="flex flex-col justify-center items-center rounded-md text-[#fff] text-2xl font-semibold space-y-12">
        <span>러닝을 시작합니다!</span>
        <div className="text-[#fff] text-[6rem] font-bold animate-pulse">
          {count}
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
