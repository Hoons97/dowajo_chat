import { useEffect } from "react";
import "./Videos.scss";
import { AiOutlineUser } from "react-icons/ai";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";

const Videos = ({
  myInfo,
  oppInfo,
  myStream,
  oppStream,
  settings,
  oppSettings,
  myVideoRef,
  remoteVideoRef,
  myMic,
  oppMic,
  myname,
  cname,
  uname,
  oppConnected,
}) => {
  useEffect(() => {
    console.log("Videos 리렌더링");
    if (myVideoRef.current && myStream.current && !myVideoRef.current.srcObject)
      myVideoRef.current.srcObject = myStream.current;

    if (
      remoteVideoRef.current &&
      oppStream.current &&
      !remoteVideoRef.current.srcObject
    )
      remoteVideoRef.current.srcObject = oppStream.current;
  }, [settings, oppSettings]);
  return (
    <div className="Videos">
      <div className="video" hidden={oppConnected ? false : true}>
        <div className="pb">
          <video
            autoPlay
            ref={remoteVideoRef}
            hidden={oppSettings.videoOn ? false : true}
          />
          {oppInfo.url ? (
            <img
              className="profile"
              src={"http://dowajo.run.goorm.site/" + oppInfo.url}
              alt="ㅎㅇ"
              hidden={oppSettings.videoOn ? true : false}
            />
          ) : (
            !oppSettings.videoOn && <AiOutlineUser className="profile" />
          )}
        </div>
        <div className="info">
          <div className="name">{cname}</div> <div className="null" />
          {oppSettings.mikeOn ? <BsFillMicFill /> : <BsFillMicMuteFill />}
        </div>
      </div>

      <div className="video">
        <div className="container">
          <div className="inner">
            <div className="pb">
              <video
                autoPlay
                ref={myVideoRef}
                muted
                hidden={settings.videoOn ? false : true}
              />
              {myInfo.url ? (
                <img
                  className="profile"
                  src={"http://dowajo.run.goorm.site/" + myInfo.url}
                  alt="ㅎㅇ"
                  hidden={settings.videoOn ? true : false}
                />
              ) : (
                !settings.videoOn && <AiOutlineUser className="profile" />
              )}
            </div>
            <div className="info">
              <div className="name">{myname}</div> <div className="null" />
              {myMic ? <BsFillMicFill /> : <BsFillMicMuteFill />}
            </div>
          </div>
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
