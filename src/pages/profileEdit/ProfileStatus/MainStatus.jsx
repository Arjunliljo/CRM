const arr = new Array(100).fill(0);

export default function MainStatus() {
  return (
    <div className="content-section main-status-container">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Main Status</h2>
      </div>
      <div className="content-section-item-box">
        {arr.map((item, index) => (
          <div className="form-group" key={index}>
            <div className="status-item">Status</div>
          </div>
        ))}
      </div>
    </div>
  );
}
