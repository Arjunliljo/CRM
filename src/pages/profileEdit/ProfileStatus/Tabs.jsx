const arr = new Array(100).fill(0);

export default function Tabs() {
  return (
    <div className="content-section main-status-container">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Tabs</h2>
      </div>
      <div className="content-section-item-box">
        {arr.map((item, index) => (
          <div className="form-group" key={index}>
            <div className="status-item">Tabs</div>
          </div>
        ))}
      </div>
    </div>
  );
}
