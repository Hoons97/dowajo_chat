import { AiOutlineUser } from "react-icons/ai";

import cn from "classnames";
import "./Message.scss";

const Message = ({ message, profileUrl }) => {
  const you = message.yourMessage;

  return (
    <div className={cn("Message", { you })}>
      <div className="profile">
        {you?<AiOutlineUser />:<img src={'http://dowajo.run.goorm.site/'+message.url} alt="ㅎㅇ"/>}
      </div>
      <div className="content">
        <div className="info">
            <div className="name">{message.name}</div>
            <div className="time">{message.time}</div>
        </div>
        <div className="text"> {message.text}</div>
      </div>
    </div>
  );
};

export default Message;
