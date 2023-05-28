import "./SettingBar.scss";
import Slider from "@mui/material/Slider";
import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsCameraVideoFill,
  BsCameraVideoOffFill,
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
} from "react-icons/bs";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import DeviceList from "./DeviceList";
import { useCallback, useEffect, useRef, useState } from "react";

function SettingBar({
  myVideoRef,
  remoteVideoRef,
  cameraLable,
  mikeLable,
  speakerLable,
  setSpeakerLable,
  myStream,
  getMedia,
  settings,
  setSettings,
  ableVideos,
  ableSpeakers,
  ableMikes,
  onExit,
  ioSocket,
}) {
  const [volume, setVolume] = useState(80);

  //볼륨 설정 시 상대 비디오 볼륨 조절
  const handleVolumeChange = useCallback((e) => {
    setVolume(e.target.value);
    console.log(e.target.value);
    if (remoteVideoRef.current)
      remoteVideoRef.current.volume = e.target.value / 100;
  });

  useEffect(() => {
    if (remoteVideoRef.current) remoteVideoRef.current.volume = volume / 100;
  }, [ableSpeakers, settings, volume]);

  useEffect(()=>{
    if (ableSpeakers.length !== 0) {
      console.log(ableSpeakers);
      setSpeakerLable(ableSpeakers[0].label);
    }
  },[ableSpeakers])

  async function changeCamera(e) {
    console.log(e.target.value);
    await getMedia(e.target.value, undefined);
    resetOption();
  }

  async function changeMike(e) {
    console.log(e.target.value);
    await getMedia(undefined, e.target.value);
    resetOption();
  }

  async function changeSpeaker(e) {
    console.log(e.target.value);
    await attachSinkId(remoteVideoRef.current, e.target.value, e);
    resetOption();
  }

  //오디오 출력 device 변경
  const attachSinkId = useCallback((element, sinkId, e) => {
    if (typeof element.sinkId !== "undefined" && element) {
      element
        .setSinkId(sinkId)
        .then(() => {
          console.log(`Success, audio output device attached: ${sinkId}`);
          setSpeakerLable(e.target.innerHTML);
        })
        .catch((error) => {
          let errorMessage = error;
          if (error.name === "SecurityError") {
            errorMessage = `You need to use HTTPS for selecting audio output device: ${error}`;
          }
          console.error(errorMessage);
        });
    } else {
      console.warn("Browser does not support output device selection.");
    }
  }, [setSpeakerLable]);

  //설정 변경 이벤트
  const changeSettings = useCallback(
    (e) => {
      console.log(e);
      console.log(myStream.current.getAudioTracks());

      if (e === "mikeOn") {
        myStream.current
          .getAudioTracks()
          .forEach((track) => (track.enabled = !track.enabled));
      }
      if (e === "videoOn") {
        console.log(myStream.current.getVideoTracks());
        myStream.current
          .getVideoTracks()
          .forEach((track) => (track.enabled = !track.enabled));
      }
      if (e === "speakerOn") {
        remoteVideoRef.current.muted = !remoteVideoRef.current.muted;
      }
      setSettings({ ...settings, [e]: !settings[e] });
    },
    [settings]
  );

  //디바이스 리스트 클릭시
  const changeDeviceOptions = useCallback(
    (e) => {
      console.log(e);
      if (settings[e] === true) setSettings({ ...settings, [e]: !settings[e] });
      else {
        let newSetting = {
          ...settings,
          mikeOption: false,
          videoOption: false,
          speakerOption: false,
        };
        console.log(newSetting);
        setSettings({ ...newSetting, [e]: true });
      }
    },
    [settings]
  );

  const resetOption = useCallback(() => {
    setSettings({
      ...settings,
      mikeOption: false,
      videoOption: false,
      speakerOption: false,
    });
  }, [settings, setSettings]);

  return (
    <div className="SettingBar">
      <div className="volume">
        <div className="iconContainer">
          <button onClick={() => changeSettings("speakerOn")}>
            {settings.speakerOn ? (
              <BsFillVolumeUpFill />
            ) : (
              <BsFillVolumeMuteFill />
            )}
          </button>
          <button
            className="Devices"
            onClick={() => changeDeviceOptions("speakerOption")}
          >
            {!settings.speakerOption ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </button>
          {settings.speakerOption && (
            <DeviceList
              resetOption={resetOption}
              lable={speakerLable}
              list={ableSpeakers}
              getMedia={getMedia}
              event={changeSpeaker}
            />
          )}
        </div>
        <Slider
          aria-label="Volume"
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={100}
          defaultValue={80}
          valueLabelDisplay="auto"
        />
      </div>
      <div className="icons">
        <div className="iconContainer">
          <button onClick={() => changeSettings("mikeOn")}>
            {settings.mikeOn ? <BsFillMicFill /> : <BsFillMicMuteFill />}
          </button>
          <button
            className="Devices"
            onClick={() => changeDeviceOptions("mikeOption")}
          >
            {!settings.mikeOption ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </button>
          {settings.mikeOption && (
            <DeviceList
              resetOption={resetOption}
              lable={mikeLable}
              list={ableMikes}
              getMedia={getMedia}
              event={changeMike}
            />
          )}
        </div>

        <div className="iconContainer">
          <button onClick={() => changeSettings("videoOn")}>
            {settings.videoOn ? (
              <BsCameraVideoFill />
            ) : (
              <BsCameraVideoOffFill />
            )}
          </button>
          <button
            className="Devices"
            onClick={() => changeDeviceOptions("videoOption")}
          >
            {!settings.videoOption ? (
              <MdKeyboardArrowUp />
            ) : (
              <MdKeyboardArrowDown />
            )}
          </button>
          {settings.videoOption && (
            <DeviceList
              resetOption={resetOption}
              lable={cameraLable}
              list={ableVideos}
              getMedia={getMedia}
              event={changeCamera}
            />
          )}
        </div>
      </div>

      <button className="exit" value="나가기" onClick={onExit}>
        나가기
      </button>
    </div>
  );
}

export default SettingBar;
