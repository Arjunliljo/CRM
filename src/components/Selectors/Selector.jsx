import { useDispatch } from "react-redux";

function Selector({
  optionsObj = [{ option: "Option 1", value: "Option 1" }],
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
        {optionsObj.map((option, index) => (
          <option key={index} value={option}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Selector;
