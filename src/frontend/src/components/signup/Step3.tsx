import { preferenceType } from "@/constants/preference";
import { usePreferencePost } from "@/hooks/useAuth";
import { PreferenceRequest } from "@/types/signup";
import { Dispatch, SetStateAction, useState } from "react";

type Step3Props = {
  setStep: Dispatch<SetStateAction<number>>;
};

const Step3 = ({ setStep }: Step3Props) => {
  const [preferenceStep, setPreferenceStep] = useState(1);
  const [preferenceData, setPreferenceData] = useState<PreferenceRequest>({
    elevation: preferenceType.LOW,
    convenience: preferenceType.LOW,
    track: preferenceType.LOW,
  });

  const { mutate: preferencePost } = usePreferencePost();

  const preferences: {
    type: keyof PreferenceRequest;
    title: string;
    result: { id: string | boolean; title: string }[];
  }[] = [
    {
      type: "elevation",
      title: "경사가 있는 길을 선호하시나요?",
      result: [
        { id: preferenceType.LOW, title: "평평한 길이 좋아요" },
        { id: preferenceType.MEDIUM, title: "적당히 경사있는 길이 좋아요" },
        { id: preferenceType.HIGH, title: "경사있는 길이 좋아요" },
      ],
    },
    {
      type: "convenience",
      title: "편의시설(화장실, 편의점)이 있는 코스를 선호하시나요?",
      result: [
        { id: preferenceType.LOW, title: "네, 좋아요" },
        { id: preferenceType.MEDIUM, title: "상관 없어요" },
        { id: preferenceType.HIGH, title: "선호하지 않아요" },
      ],
    },
    {
      type: "track",
      title: "트랙 코스를 선호하시나요?",
      result: [
        { id: preferenceType.LOW, title: "네, 좋아요" },
        { id: preferenceType.MEDIUM, title: "상관 없어요" },
        { id: preferenceType.HIGH, title: "선호하지 않아요" },
      ],
    },
  ];

  // 입력값 변경 핸들러
  const handleChange = (
    key: keyof PreferenceRequest,
    value: string | boolean
  ) => {
    setPreferenceData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNextStep = () => {
    if (preferenceStep < preferences.length) {
      setPreferenceStep(preferenceStep + 1);
    } else {
      preferencePost(preferenceData);
      setStep(4);
    }
  };

  return (
    <div className="h-[750px] flex flex-col justify-center items-center gap-10">
      <div className="text-[#444] text-[24px] text-center px-14 font-bold">
        {preferences[preferenceStep - 1].title}
      </div>
      <div className="flex flex-col">
        {preferences[preferenceStep - 1].result.map((data) => (
          <button
            key={data.title}
            className={`py-2 px-8 m-2 border rounded text-lg ${
              preferenceData[preferences[preferenceStep - 1].type] === data.id
                ? "bg-[#9993E5] text-white"
                : "bg-white text-[#444]"
            }`}
            onClick={() =>
              handleChange(preferences[preferenceStep - 1].type, data.id)
            }
          >
            {data.title}
          </button>
        ))}
        <button
          type="submit"
          onClick={handleNextStep}
          className="fixed bottom-12 bg-[#9993E5] text-white text-[24px] left-[50%] translate-x-[-50%] font-semibold rounded w-[300px] py-2"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default Step3;
