import { useEffect, useState } from "react";

export default function AutoBtn({ style, callBack = () => {}, isAuto }) {
  const [set, onSet] = useState(isAuto);

  useEffect(() => {
    onSet(isAuto);
  }, [isAuto]);

  const handleClick = async () => {
    onSet((val) => !val);
    callBack(!set);
  };

  return (
    <button
      style={style}
      onClick={handleClick}
      className={`btn btn-auto ${set ? "btn-auto-on" : ""}`}
    >
      <span>Auto Assign</span>
      <span className="btn-auto-off">{set ? "On" : "Off"}</span>
    </button>
  );
}
