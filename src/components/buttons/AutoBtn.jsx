import { useDispatch } from "react-redux";

export default function AutoBtn({ style, set, onSet }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(onSet(!set));
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
