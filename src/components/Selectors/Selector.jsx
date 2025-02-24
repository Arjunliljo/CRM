import { useDispatch } from "react-redux";

function Selector({
  optionsObj = [{ option: "Option 1", value: "Option 1" }],
  set = "Option 1",
  onSet = () => {},
  redux = true,
  disabled = false,
  placeholder,
}) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (redux) {
      dispatch(onSet(e.target.value));
    } else {
      onSet(e.target.value);
    }
  };

  return (
    <div className="select-container">
      <select
        className="custom-select"
        onChange={handleChange}
        value={set}
        disabled={disabled}
      >
        <option value={""}>{placeholder}</option>
        {optionsObj.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Selector;
