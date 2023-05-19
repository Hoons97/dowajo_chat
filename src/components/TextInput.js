import {useState, useCallback} from 'react';

import "./TextInput.scss";
import {BsFillSendFill} from 'react-icons/bs'

const TextInput = ({sendMessage}) => {
  const [value, setValue] = useState('');
  const onChange=useCallback((e)=>{
    setValue(e.target.value);
  },[]);

  return (
    <form className="TextInput" onSubmit={(e)=>{
      e.preventDefault();
      setValue('');
      sendMessage(value);
    }}>
      <input placeholder="상대방에게 인사해보세요!" value={value} onChange={onChange} />
      <button type="submit" >
        <BsFillSendFill />
      </button>
    </form>
  );
};

export default TextInput;