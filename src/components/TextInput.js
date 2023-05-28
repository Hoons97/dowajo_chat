import { useState, useCallback, useEffect, useRef } from "react";

import "./TextInput.scss";
import { BsFillSendFill } from "react-icons/bs";

const TextInput = ({ sendMessage, ioSocket }) => {
  const [value, setValue] = useState("");
  const [oppTyping, setOppTyping] = useState(false);

  const typingStatus = useRef(false);

  useEffect(() => {
    function onTyping() {
      setOppTyping(true);
    }

    function doneTyping() {
      setOppTyping(false);
    }

    ioSocket.current.on("typing", onTyping);
    ioSocket.current.on("doneTyping", doneTyping);
    return () => {
      ioSocket.current.off("typing", onTyping);
      ioSocket.current.off("doneTyping", doneTyping);
    };
  }, []);

  useEffect(()=>{
    if(value && typingStatus.current === false) {
      ioSocket.current.emit('typing');
      typingStatus.current = true;
    }
    if(!value && typingStatus.current === true){
      ioSocket.current.emit('doneTyping');
      typingStatus.current=false;
    }
  })
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  return (
    <form
      className="TextInput"
      onSubmit={(e) => {
        e.preventDefault();
        setValue("");
        sendMessage(value);
      }}
    >
      <input
        placeholder="상대방에게 인사해보세요!"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <BsFillSendFill />
      </button>

      {oppTyping && <div className="typing">
        상대방이 입력중입니다...
      </div>}
    </form>
  );
};

export default TextInput;
