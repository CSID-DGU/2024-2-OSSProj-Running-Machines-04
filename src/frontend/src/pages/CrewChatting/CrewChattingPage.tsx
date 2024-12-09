import CommentInput from "@/components/common/CommentInput";
import { ReactComponent as BackIcon } from "@/assets/icons/BackIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCrewChatGet, useCrewChatPost } from "@/hooks/useCrew";
import Spinner from "@/components/common/Spinner";
import { useUserInfoGet } from "@/hooks/useMypage";

const CrewChattingPage = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const { data: user } = useUserInfoGet();
  const { data, isLoading } = useCrewChatGet(1);

  const { mutate } = useCrewChatPost({
    onSuccess: () => {
      setComment(""); // 성공 후 입력값 초기화
    },
  });

  const handleSubmit = () => {
    mutate({
      crewId: 1,
      data: {
        crewId: 1,
        content: comment,
        images: [],
      },
    });
  };

  return (
    <>
      {isLoading && <Spinner />}
      {/* 댓글 입력창 */}
      <CommentInput
        comment={comment}
        setComment={setComment}
        onSubmit={handleSubmit}
      />
      {data && user && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-chattingGradient flex flex-col">
          <div className="shadow-sm w-full flex justify-start p-4">
            <BackIcon onClick={() => navigate("/crew")} />
          </div>
          {/* 채팅 메시지 영역 */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {data.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.senderNickname === user.nickName
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`relative max-w-[70%] px-4 py-2 rounded-lg text-white ${
                    message.senderNickname === user.nickName
                      ? "bg-green-500 before:bg-green-500"
                      : "bg-gray-600 before:bg-gray-600"
                  }`}
                  style={{ borderRadius: "12px" }}
                >
                  {/* 말풍선 꼬리 */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 ${
                      message.senderNickname === user.nickName
                        ? "-right-2 before:rotate-45"
                        : "-left-2 before:rotate-45"
                    }`}
                  >
                    <div
                      className={`absolute w-full h-full bg-inherit transform rotate-45`}
                    ></div>
                  </div>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CrewChattingPage;
