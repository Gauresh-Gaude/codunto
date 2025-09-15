import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
import "./AssignItems.css"

const AssignItems = ({ items = [] }) => {
  const [people, setPeople] = useState(["Gauresh", "Ajay "]);
  const [assignments, setAssignments] = useState({});

  const addPerson = () => {
    const newName = prompt("Enter person's name:");
    if (newName) setPeople([...people, newName]);
  };

  const assignItem = (item, person) => {
    setAssignments({ ...assignments, [item.name]: person });
  };

  return (
    <div className="assign-container">
      <h2>Assign Items</h2>
      <button onClick={addPerson}>+ Add Person</button>

      {items.map((item, i) => (
        <div key={i} className="assign-row">
          <span>{item.name} - ${item.price}</span>
          <select
            onChange={(e) => assignItem(item, e.target.value)}
            value={assignments[item.name] || ""}
          >
            <option value="">Select Person</option>
            {people.map((p, j) => (
              <option key={j} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button className="continue-btn">Split Evenly</button>
    </div>
  );
};

export default AssignItems;