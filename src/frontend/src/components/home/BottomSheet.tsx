import { Dispatch, SetStateAction, useState, useEffect } from "react";

type BottomSheetProps = {
  setOpenSheet: Dispatch<SetStateAction<boolean>>;
};

const BottomSheet = ({ setOpenSheet }: BottomSheetProps) => {
  const [isVisible, setIsVisible] = useState(false); // 애니메이션 트리거 상태
  const [fullScreen, setFullScreen] = useState(false); // 바텀 시트를 전체 화면으로 확장할지 여부
  const [startY, setStartY] = useState(0); // 터치 시작 위치

  useEffect(() => {
    setIsVisible(true); // 컴포넌트 마운트 시 애니메이션 시작
  }, []);

  const closeSheet = () => {
    setIsVisible(false);
    setTimeout(() => setOpenSheet(false), 300); // 애니메이션 후 바텀 시트를 닫기
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartY(e.touches[0].clientY); // 터치 시작 위치 저장
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const currentY = e.touches[0].clientY;
    const distance = startY - currentY; // 터치 이동 거리 계산

    // 위로 50px 이상 밀면 fullScreen 상태 활성화, 아래로 50px 이상 밀면 fullScreen 해제
    if (distance > 50) {
      setFullScreen(true);
    } else if (distance < -50) {
      setFullScreen(false);
    }
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
        className={`bg-white fixed bottom-0 left-0 w-full rounded-t-3xl flex flex-col py-10 px-8 transform transition-transform duration-300 overflow-auto ${
          isVisible ? "translate-y-0" : "translate-y-full"
        } ${fullScreen ? "h-[90vh]" : "h-fit"}`} // fullScreen 상태에 따라 높이 설정
      >
        <div className="mb-6 text-[18px] text-[#444]">나만의 추천 코스</div>
        <div className="flex items-center justify-between">
          <div className="min-w-[40%] h-[114px] rounded-[10px] overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPN4G0eqMmau3KDBVIiRCbyS3Q1XC9KzY1wQ&s"
              alt="경로"
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="text-[30px] font-semibold text-right">4.38km</div>
            <div className="flex flex-wrap justify-end gap-2">
              <div className="bg-[#B1FF8C] p-1 rounded">#경사있는</div>
              <div className="bg-[#B1FF8C] p-1 rounded">#경치가 좋은</div>
              <div className="bg-[#B1FF8C] p-1 rounded">
                #친구와 함께 달리기 좋은
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
