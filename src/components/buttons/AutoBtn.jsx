import { useEffect, useState } from "react";

export default function AutoBtn({ style, callBack = () => {} }) {
  const [set, onSet] = useState(false);

  const handleClick = async () => {
    onSet((val) => !val);
  };

  useEffect(() => {
    callBack(set);
  }, [set, callBack]);

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
