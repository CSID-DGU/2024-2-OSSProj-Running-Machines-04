import { preferenceType } from "@/constants/preference";
import { useCourseReviewPost } from "@/hooks/useRunning";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ReviewPage = () => {
  const { courseId } = useParams();
  const [difficulty, setDifficulty] = useState<preferenceType>(
    preferenceType.HIGH
  );
  const [selectedKeywords, setSelectedKeywords] = useState<number[]>([]);

  const keywords = [
    "#산",
    "#나무",
    "#강",
    "#야경",
    "#산책로",
    "#아스팔트",
    "#산길",
    "#사람이 많아요",
    "#길이 넓어요",
    "#가족",
    "#친구",
    "#연인",
    "#반려동물",
  ];

  const { mutate } = useCourseReviewPost(Number(courseId), {
    difficulty: difficulty,
    tagIds: selectedKeywords,
  });

  const handleDifficultyClick = (level: preferenceType) => {
    setDifficulty(level);
  };

  const handleKeywordClick = (index: number) => {
    setSelectedKeywords((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const handleComplete = () => {
    console.log(difficulty, selectedKeywords);
    mutate();
  };

  return (
    <div className="w-full p-10 bg-white flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-center mb-6">
        후기를 남겨주세요!
      </h1>

      {/* 난이도 */}
      <div className="mb-4">
        <h2 className="text-xl font-medium">코스 난이도는 어땠나요?</h2>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            className={`px-6 py-2 text-white rounded-full ${
              difficulty === preferenceType.HIGH
                ? "bg-green-500"
                : "bg-gray-400"
            } hover:bg-green-500`}
            onClick={() => handleDifficultyClick(preferenceType.HIGH)}
          >
            상
          </button>
          <button
            className={`px-6 py-2 text-white rounded-full ${
              difficulty === preferenceType.MEDIUM
                ? "bg-yellow-500"
                : "bg-gray-400"
            } hover:bg-yellow-500`}
            onClick={() => handleDifficultyClick(preferenceType.MEDIUM)}
          >
            중
          </button>
          <button
            className={`px-6 py-2 text-white rounded-full ${
              difficulty === preferenceType.LOW ? "bg-red-500" : "bg-gray-400"
            } hover:bg-red-500`}
            onClick={() => handleDifficultyClick(preferenceType.LOW)}
          >
            하
          </button>
        </div>
      </div>

      {/* 키워드 */}
      <div className="mb-10">
        <h2 className="text-xl font-medium">코스의 키워드를 선택해주세요!</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {keywords.map((keyword, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-white rounded-full ${
                selectedKeywords.includes(index) ? "bg-blue-900" : "bg-gray-400"
              } hover:bg-blue-600`}
              onClick={() => handleKeywordClick(index)}
            >
              {keyword}
            </button>
          ))}
        </div>
      </div>

      {/* 완료 버튼 */}
      <button
        onClick={handleComplete}
        className="mb-12 text-white text-2xl font-semibold py-3 bg-[#9993E5] rounded-xl hover:bg-[#4a41ce]"
      >
        완료
      </button>
    </div>
  );
};

export default ReviewPage;
