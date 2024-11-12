import { useState, useEffect } from "react";

const AlertModal = () => {
  const [count, setCount] = useState(5);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [count]);

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
