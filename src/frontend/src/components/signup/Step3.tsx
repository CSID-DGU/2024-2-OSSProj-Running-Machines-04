import { PreferenceRequest } from "@/types/signup";
import { Dispatch, SetStateAction, useState } from "react";

type Step3Props = {
  onPreferenceData: (
    key: keyof PreferenceRequest,
    value: string | boolean
  ) => void;
  setStep: Dispatch<SetStateAction<number>>;
};

const Step3 = ({ onPreferenceData, setStep }: Step3Props) => {
  const [preferenceStep, setPreferenceStep] = useState(1);

  const preferences = [
    {
      type: "nature",
      title: "어떤 코스를 선호하시나요?",
      result: [
        { id: true, title: "자연과 함께 하고 싶어요" },
        { id: false, title: "도시 속에서 뛰는 게 좋아요" },
      ],
    },
    {
      type: "elevation",
      title: "경사가 있는 길을 선호하시나요?",
      result: [
        { id: "LOW", title: "평평한 길이 좋아요" },
        { id: "MEDIUM", title: "적당히 경사있는 길이 좋아요" },
        { id: "HIGH", title: "경사있는 길이 좋아요" },
      ],
    },
    {
      type: "convenience",
      title: "편의시설(화장실, 편의점)이 있는 코스를 선호하시나요?",
      result: [
        { id: true, title: "네" },
        { id: false, title: "아니오" },
      ],
    },
    {
      type: "track",
      title: "트랙 코스를 선호하시나요?",
      result: [
        { id: "track", title: "네, 좋아요" },
        { id: "any", title: "상관 없어요" },
        { id: "notrack", title: "선호하지 않아요" },
      ],
    },
  ];

  const handleNextStep = (type: string, value: string | boolean) => {
    onPreferenceData(type as keyof PreferenceRequest, value);
    if (preferenceStep < preferences.length) {
      setPreferenceStep(preferenceStep + 1);
    } else setStep(4);
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
            className="py-2 px-8 m-2 border rounded text-lg"
            onClick={() =>
              handleNextStep(preferences[preferenceStep - 1].type, data.id)
            }
          >
            {data.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Step3;
