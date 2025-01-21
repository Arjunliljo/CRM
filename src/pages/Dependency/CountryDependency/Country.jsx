import CountryBtn from "../../../components/buttons/CountryBtn";

export default function Country() {
  return (
    <div className="content-section">
      <div className="content-section-head">
        <h2>Add new Country</h2>
        <label className="upload-btn" style={{ position: 'relative' }}>
          <input
            type="file"
            accept="image/*"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
              opacity: 0,
              cursor: 'pointer'
            }}
          />
          Upload Flag Image
        </label>
      </div>

      <div className="content-section-item-box">
        <div className="form-group">
          <input type="text" placeholder="Name" className="input-formGroup" />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Country code" className="input-formGroup" />
        </div>
        <div className="modal__form-buttons" style={{ marginTop: "2rem" }}>
          <CountryBtn >Cancel</CountryBtn>
          <CountryBtn style={{ backgroundColor: "#0075fc" }}>
            Save
          </CountryBtn>
        </div>
      </div>
    </div >
  );
}
