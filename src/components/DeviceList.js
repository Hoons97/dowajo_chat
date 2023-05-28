import "./DeviceList.scss";
import cn from "classnames";
const DeviceList = ({ list, getMedia, type, lable, resetOption, event }) => {

  return (
    <div className="DeviceList">
      <div className="deviceContainer">
        {list.map((device) => (
          <option
            className={device.label === lable ? "Device Current" : "Device"}
            value={device.deviceId}
            key={device.deviceId}
            name={device.label}
            onClick={(e) => {
              event(e);
            }}
          >
            {device.label}
          </option>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
