import { RouteResponse } from "@/types/routes";
import { ReactComponent as CourseCTA } from "@/assets/icons/CourseCTA.svg";
import { ReactComponent as Toilet } from "@/assets/icons/Toilet.svg";
import { ReactComponent as TrafficLight } from "@/assets/icons/TrafficLight.svg";
import { ReactComponent as Store } from "@/assets/icons/Store.svg";
import useKakaomapStore from "@/store/useKakaomapStore";
import useParsedCourseStore from "@/store/useParsedCourse";

type CourseCardProps = {
  courseData: RouteResponse;
  onClickCourse: (id: number) => void;
};

const CourseCard = ({ courseData, onClickCourse }: CourseCardProps) => {
  const { setKakaomapState } = useKakaomapStore();
  const { parsedCourse } = useParsedCourseStore();

  const handleCourseClick = (id: number) => {
    // 해당 id와 일치하는 아이템 찾기
    const route = parsedCourse.find((route) => route.id == id);

    // 아이템이 존재하고 path가 유효하다면 코스의 시작점으로 카카오맵 센터 설정
    if (route && route.path.length > 0) {
      setKakaomapState({
        ...useKakaomapStore.getState().kakaomapState,
        // 폴리라인 시작좌표 이동
        center: { lat: route.path[0].lat, lng: route.path[0].lng },
      });
    }
    onClickCourse(id);
  };

  const renderCourseTags = (tags: string[]) =>
    tags.map((tag) => (
      <div
        key={tag}
        className="bg-[#B1FF8C] px-2 rounded text-[14px] font-light"
      >
        #{tag}
      </div>
    ));

  return (
    <div
      key={courseData.courseId}
      className="flex items-stretch justify-between gap-2"
    >
      <div className="p-4 w-[50%] bg-courseGradient rounded-[10px] flex flex-col justify-center items-center">
        <div className="text-[#444] font-semibold text-center break-keep">
          {courseData.name}
        </div>
        <div className="text-[#444] text-sm text-center break-keep">
          "{courseData.description}"
        </div>
      </div>
      <div className="w-[50%] flex flex-col gap-1">
        <div className="flex justify-end items-center gap-3 text-3xl font-bold">
          {courseData.distance}km
          <CourseCTA onClick={() => handleCourseClick(courseData.courseId)} />
        </div>
        <div className="flex gap-3 justify-end">
          <div className="flex items-center gap-1">
            <TrafficLight /> {courseData.trafficLightCounts}개
          </div>
          <div className="flex items-center gap-1">
            <Store /> {courseData.storeCounts}개
          </div>
          <div className="flex items-center gap-1">
            <Toilet /> {courseData.toiletCounts}개
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-2">
          {renderCourseTags(courseData.tags)}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
