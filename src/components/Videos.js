import "./Videos.scss";
import { BsFillMicFill, BsFillMicMuteFill } from "react-icons/bs";

const Videos = ({ myVideoRef, remoteVideoRef, myMic, oppMic }) => {
    const counselorName = '강성태'
    return (
    <div className="Videos">
      <div className="video">
        <video autoPlay ref={remoteVideoRef} />
        <div className="info">
          <div className="name">{counselorName}</div> <div className="null" />{oppMic?<BsFillMicFill />:<BsFillMicMuteFill />}
        </div>
      </div>
      <div className="video">
        <video autoPlay ref={myVideoRef} />
        <div className="info">
          <div className="name">장승훈</div> <div className="null" />{myMic?<BsFillMicFill />:<BsFillMicMuteFill />}
        </div>
      </div>
    </div>
  );
};

export default Videos;
