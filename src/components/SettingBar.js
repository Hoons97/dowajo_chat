import "./SettingBar.scss";
import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";

function SettingBar({settings, changeSettings}) {
  return (
    <div className="SettingBar" >
      <div></div>
      <div className="icons">
      <button onClick={()=>changeSettings("speakerOn")}>
        {settings.speakerOn?<BsFillVolumeUpFill />:<BsFillVolumeMuteFill />}
      </button>
      <button onClick={()=>changeSettings("mikeOn")}>
      {settings.mikeOn?<BsFillMicFill />:<BsFillMicMuteFill />}
      </button>
      <button onClick={()=>changeSettings("videoOn")}>
      {settings.videoOn?<BsCameraVideoFill />:<BsCameraVideoOffFill />}
      </button>
      </div>

      <button className="exit" value="나가기">
        나가기
      </button>
    </div>
  );
}

export default SettingBar;
