import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./ManualEntry.css";

const ManualEntry = ({ goBack }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([{ name: "", price: "" }]);
  const [tip, setTip] = useState(0);
  const [tax, setTax] = useState(0);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", price: "" }]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const total = items.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0),
    0
  ) + parseFloat(tip || 0) + parseFloat(tax || 0);

  return (
    <div className="manual-container">
      <button className="back-btn" onClick={() => navigate("/")}>←Back</button>

      <h2>Receipt Items</h2>
      <p>List all the items on your receipt</p>

      <div className="items-list">
        {items.map((item, index) => (
          <div key={index} className="item-row">
            <input
              type="text"
              placeholder="Item name"
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
            />
            <input
              type="number"
              placeholder="$0"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
            />
            <button className="delete-btn" onClick={() => removeItem(index)}>
              🗑
            </button>
          </div>
        ))}
      </div>

      <button className="add-btn" onClick={addItem}>+ Add Item</button>

      <div className="extra-inputs">
        <label>
          <h4>Tip: $</h4>
          <input
            type="number"
            value={tip}
            onChange={(e) => setTip(e.target.value)}
          />
        </label>
        <label>
          <h4>Tax: $</h4>
          <input
            type="number"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
          />
        </label>
      </div>

      <div className="total">Total: ${total.toFixed(2)}</div>

      <button className="continue-btn" onClick={() => navigate("/assign")}>Continue</button>
    </div>
  );
};

export default ManualEntry;
