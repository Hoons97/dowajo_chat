import "./ChatLog.scss";
import Message from "./Message";
import { useRef, useEffect } from "react";

const ChatLog = ({ messages, profileUrl }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="ChatLog" ref={scrollRef}>
      {messages.map((message) =>
        message.sysMsg ? (
          message.type ==="welcome" ? (
            <div className="sysmsg" key={message.id}>
              {message.name} 님이 입장하셨습니다.{" "}
            </div>
          ) : (
            <div className="sysmsg" key={message.id}>
              {message.name} 님이 퇴장하셨습니다.{" "}
            </div>
          )
        ) : (
          <Message message={message} key={message.id} profileUrl={profileUrl} />
        )
      )}
    </div>
  );
};

export default ChatLog;
