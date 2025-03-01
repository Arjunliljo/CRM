import { useDispatch } from "react-redux";

function BlackSelector({
  options = [],
  set = "",
  onSet = () => {},
  placeholder = "All",
}) {
  const handleChange = (e) => {
    onSet(e.target.value);
  };

  return (
    <div className="selector-btn">
      <select className="selector-style" onChange={handleChange} value={set}>
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BlackSelector;
