import { useDispatch } from "react-redux";

function BlackSelector({ options = [], set = "", onSet = () => {} }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(onSet(e.target.value));
  };

  return (
    <div className="selector-btn">
      <select className="selector-style" onChange={handleChange} value={set}>
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
