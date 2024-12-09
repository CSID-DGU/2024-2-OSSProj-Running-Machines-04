import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ReactElement,
} from "react";

type BottomSheetProps = {
  setOpenSheet: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  full?: boolean;
  children: ReactElement;
};

const BottomSheet = ({
  setOpenSheet,
  onClose,
  children,
  full = false,
}: BottomSheetProps) => {
  const [isVisible, setIsVisible] = useState(false); // 애니메이션 트리거 상태
  const [fullScreen, setFullScreen] = useState(true); // 바텀 시트를 전체 화면으로 확장할지 여부
  const [startY, setStartY] = useState<number | null>(null); // 터치 시작 위치
  const [currentY, setCurrentY] = useState<number | null>(null); // 터치 이동 위치

  useEffect(() => {
    setIsVisible(true); // 컴포넌트 마운트 시 애니메이션 시작
  }, []);

  const closeSheet = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
    setTimeout(() => setOpenSheet(false), 300); // 애니메이션 후 바텀 시트를 닫기
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartY(e.touches[0].clientY); // 터치 시작 위치 저장
    setCurrentY(null); // 초기화
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchY = e.touches[0].clientY;
    setCurrentY(touchY); // 현재 터치 위치 업데이트
  };

  const handleTouchEnd = () => {
    if (startY !== null && currentY !== null) {
      const distance = startY - currentY;
      console.log(distance);

      // 위로 드래그 (50px 이상) -> fullScreen 활성화
      if (distance > 50) {
        setFullScreen(true);
      }
      // 아래로 드래그 (-50px 이하) -> fullScreen 해제
      else if (distance < -50) {
        setFullScreen(false);
      }
    }

    // 초기화
    setStartY(null);
    setCurrentY(null);
  };

  return (
    <div
      onClick={closeSheet}
      className="z-[100] fixed bottom-0 left-0 w-screen h-screen bg-[rgba(123,119,119,0.4)]"
    >
      <div
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 이벤트 버블링 방지
        onTouchStart={handleTouchStart} // 터치 시작 이벤트
        onTouchMove={handleTouchMove} // 터치 이동 이벤트
        onTouchEnd={handleTouchEnd} // 터치 종료 이벤트
        className={`bg-white fixed bottom-0 left-0 w-full rounded-t-3xl flex flex-col py-10 px-3 transform transition-transform duration-300 overflow-auto ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } ${fullScreen && full ? "h-[80vh]" : "h-[30vh]"}`} // full 상태와 fullScreen 상태 분리
      >
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
