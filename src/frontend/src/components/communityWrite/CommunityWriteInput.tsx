import { communityRequestType } from "@/types/communityWrite";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type CommunityWriteInputProps = {
  contents: communityRequestType;
  setContents: Dispatch<SetStateAction<communityRequestType>>;
  images: File[] | [];
  setImages: Dispatch<SetStateAction<File[] | []>>;
};

const CommunityWriteInput = ({
  contents,
  setContents,
  images,
  setImages,
}: CommunityWriteInputProps) => {
  const [previewImage, setPreviewImage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImages((prevContents) => [...prevContents, file]);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContents((prevContents) => ({
      ...prevContents,
      title: event.target.value,
    }));
  };

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContents((prevContents) => ({
      ...prevContents,
      content: event.target.value,
    }));
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [contents.content]);

  return (
    <div className="px-6 py-8 w-full">
      <input
        type="text"
        placeholder="제목을 입력해주세요"
        value={contents.title}
        onChange={handleTitleChange}
        className="text-[22px] focus:bg-none w-full"
      />
      <div className="w-full max-w-md mx-auto mt-6 p-4 border rounded-lg shadow-md bg-white">
        <div className="mb-4">
          <label
            htmlFor="photo-upload"
            className="block mb-2 font-semibold text-gray-700"
          ></label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <label
            htmlFor="photo-upload"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
          >
            사진 추가
          </label>
          {previewImage && (
            <div className="mt-4">
              <img
                src={previewImage}
                alt="프로필 사진"
                className="w-full h-48 object-cover rounded"
              />
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 font-semibold text-gray-700"
          ></label>
          <textarea
            id="description"
            ref={textareaRef}
            rows={5}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none resize-none"
            placeholder="내용을 적어주세요"
            value={contents.content}
            onChange={handleContentChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
export default CommunityWriteInput;
