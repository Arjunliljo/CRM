import CancelBtn from "../../../components/buttons/CancelBtn";
import CountryBtn from "../../../components/buttons/CountryBtn";
import NextBtn from "../../../components/buttons/NextBtn";

export default function Country() {
  return (
    <div className="content-section dependancies">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Add new Country</h2>
      </div>

      <div className="dependancies-item-box">
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Country Name"
            className="input-formGroup"
            required
          />
        </div>
        <div className="form-group">
          <textarea name="description" className="input-formGroup" required />
        </div>
        <div className="modal__form-buttons" style={{ marginTop: "2rem" }}>
          <CancelBtn>Cancel</CancelBtn>
          <NextBtn>Save</NextBtn>
        </div>
      </div>
    </div>
  );
}
