import React, { useState } from 'react';

function ItemCard({ items, title }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleItemClick = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="dynamic-selector">
      <h2 className="small-heading">{title}</h2>
      <div className="dynamic-selector-list">
        {items?.length > 0 ? (
          items.map((item, i) => (
            <span
              className={`dynamic-selector-list-item ${
                selectedItems.includes(item) ? "active" : ""
              }`}
              key={i}
              onClick={() => handleItemClick(item)}
            >
              {item.name}
            </span>
          ))
        ) : (
          <div className="No-data">No {title.toLowerCase()} available</div>
        )}
      </div>
    </div>
  );
}

export default ItemCard;