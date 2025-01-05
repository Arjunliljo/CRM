import { useDispatch } from "react-redux";

function Selector({
  options = ["Option 1", "Option 2", "Option 3"],
  set = "Option 1",
  onSet = () => {},
}) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(onSet(e.target.value));
  };

  return (
    <div className="select-container">
      <select className="custom-select" onChange={handleChange} value={set}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Selector;
