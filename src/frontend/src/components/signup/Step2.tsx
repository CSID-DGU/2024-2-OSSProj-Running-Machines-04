import { Dispatch, SetStateAction, ChangeEvent, useState } from "react";

type Step2Props = {
  setImage: Dispatch<SetStateAction<File | null>>; // 이미지 상태 관리
  setValid: Dispatch<SetStateAction<boolean>>; // 유효성 상태 관리
};

const Step2 = ({ setImage, setValid }: Step2Props) => {
  const [preview, setPreview] = useState<string | null>(null); // 미리보기 URL

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file); // 상위 컴포넌트에 파일 전달
      setValid(true); // 파일 업로드 시 유효성 true
      setPreview(URL.createObjectURL(file)); // 미리보기 URL 설정
    } else {
      setImage(null);
      setValid(false); // 파일 없으면 유효성 false
      setPreview(null);
    }
  };

  return (
    <div className="relative w-full px-10 py-14 flex flex-col items-center gap-4">
      <div className="text-lg font-medium">프로필 사진을 설정해주세요!</div>
      <div className="w-40 h-40 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
        {preview ? (
          <img
            src={preview}
            alt="Profile Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">이미지 미리보기</span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mt-4"
      />
      {preview && (
        <button
          onClick={() => {
            setImage(null);
            setValid(false);
            setPreview(null);
          }}
          className="text-sm text-red-500 mt-2"
        >
          삭제
        </button>
      )}
    </div>
  );
};

export default Step2;
