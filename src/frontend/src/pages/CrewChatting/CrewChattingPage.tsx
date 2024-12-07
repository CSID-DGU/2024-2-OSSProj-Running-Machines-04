import CommentInput from "@/components/common/CommentInput";
import { ReactComponent as BackIcon } from "@/assets/icons/BackIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CrewChattingPage = () => {
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const handleSubmit = () => {
    console.log("Comment Submitted:", comment);
    setComment(""); // 메시지 입력 후 초기화
  };

  // TODO: 서버 데이터 연결
  const messages = [
    {
      id: 1,
      sender: "crew",
      content:
        "안녕하세요 서울 FRC 러닝크루입니다! 저희 크루에 오신 것을 환영합니다. 즐겁게 러닝해보아요~",
    },
    {
      id: 2,
      sender: "user",
      content: "반갑습니당 잘 부탁드려용~",
    },
  ];

  return (
    <>
      {/* 댓글 입력창 */}
      <CommentInput
        comment={comment}
        setComment={setComment}
        onSubmit={handleSubmit}
      />
      <div className="fixed top-0 left-0 w-screen h-screen bg-chattingGradient flex flex-col">
        <div className="shadow-sm w-full flex justify-start p-4">
          <BackIcon onClick={() => navigate("/crew")} />
        </div>
        {/* 채팅 메시지 영역 */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`relative max-w-[70%] px-4 py-2 rounded-lg text-white ${
                  message.sender === "user"
                    ? "bg-green-500 before:bg-green-500"
                    : "bg-gray-600 before:bg-gray-600"
                }`}
                style={{ borderRadius: "12px" }}
              >
                {/* 말풍선 꼬리 */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 ${
                    message.sender === "user"
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
    </>
  );
};

export default CrewChattingPage;
