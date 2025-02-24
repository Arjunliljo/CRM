function UniversitySelect() {
  return (
    <select className="modal__form-input-text-select" defaultValue="">
      <option value="" disabled>
        Select University
      </option>
      <option value="harvard">Harvard University</option>
      <option value="mit">Massachusetts Institute of Technology</option>
      <option value="stanford">Stanford University</option>
      <option value="oxford">University of Oxford</option>
      <option value="cambridge">University of Cambridge</option>
      <option value="berkeley">University of California, Berkeley</option>
      <option value="eth_zurich">ETH Zurich</option>
      <option value="imperial">Imperial College London</option>
      <option value="caltech">California Institute of Technology</option>
      <option value="princeton">Princeton University</option>
    </select>
  );
}

export default UniversitySelect;
