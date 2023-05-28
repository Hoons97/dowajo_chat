import { useEffect } from "react";
import "./Videos.scss";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";

const Videos = ({
  myInfo,
  oppInfo,
  myStream,
  settings,
  oppSettings,
  myVideoRef,
  remoteVideoRef,
  myMic,
  oppMic,
  myname,
  cname,
  uname,
}) => {
  useEffect(() => {
    console.log("Videos 리렌더링");
    if (myVideoRef.current && myStream.current && !myVideoRef.current.srcObject)
      myVideoRef.current.srcObject = myStream.current;
  }, [settings, oppSettings]);
  return (
    <div className="Videos">
      <div className="video">
        <div className="pb">
          <video autoPlay ref={remoteVideoRef} />
        </div>
        <div className="info">
          <div className="name">{cname}</div> <div className="null" />
          {oppMic ? <BsFillMicFill /> : <BsFillMicMuteFill />}
        </div>
      </div>
      <div className="video">
        <div className="pb">
          <video autoPlay ref={myVideoRef} muted/>
        </div>
        <div className="info">
          <div className="name">{myname}</div> <div className="null" />
          {myMic ? <BsFillMicFill /> : <BsFillMicMuteFill />}
        </div>
      </div>
    </div>
  );
};

export default Videos;

/*
        <div className="pb">
          {settings.videoOn ? (
            <video autoPlay ref={myVideoRef} />
          ) : myInfo.url ? (
            <img
              className="profile"
              src={"http://dowajo.run.goorm.site/" + myInfo.url}
              alt="ㅎㅇ"
            />
          ) : (
            <AiOutlineUser className="profile" />
          )}
          */
