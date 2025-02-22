function QualificationSelector() {
  return (
    <select className="modal__form-input-text-select" defaultValue="">
      <option value="" disabled>
        Qualification
      </option>
      <option value="secondary">
        Secondary Education (12th Grade/A-Levels)
      </option>
      <option value="bachelor_arts">Bachelor of Arts (BA)</option>
      <option value="bachelor_science">Bachelor of Science (BSc)</option>
      <option value="bachelor_engineering">
        Bachelor of Engineering (BE/BTech)
      </option>
      <option value="bachelor_commerce">Bachelor of Commerce (BCom)</option>
      <option value="master_arts">Master of Arts (MA)</option>
      <option value="master_science">Master of Science (MSc)</option>
      <option value="master_engineering">
        Master of Engineering (ME/MTech)
      </option>
      <option value="master_business">
        Master of Business Administration (MBA)
      </option>
      <option value="phd">Doctor of Philosophy (Ph.D.)</option>
      <option value="other">Other Relevant Qualification</option>
    </select>
  );
}

export default QualificationSelector;
