const arr = new Array(100).fill(0);

import { defaultTabs } from "../../../api/Data/getData";

export default function Tabs() {
  const tabs = defaultTabs;
  console.log(tabs, "tabs");
  return (
    <div className="content-section main-status-container">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Tabs</h2>
      </div>
      <div className="content-section-item-box">
        {tabs.map((item, index) => (
          <div className="form-group" key={index}>
            <div className="forms-status-item">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
