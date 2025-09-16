import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./AssignItems.css";

const AssignItems = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { items = [], tip = 0, tax = 0 } = location.state || {};

  const [people, setPeople] = useState([""]);
  const [assignments, setAssignments] = useState({});

  const handlePersonChange = (index, value) => {
    const updated = [...people];
    updated[index] = value;
    setPeople(updated);
  };

  const addPerson = () => setPeople([...people, ""]);
  const removePerson = (index) => {
    setPeople(people.filter((_, i) => i !== index));
  };

  const toggleAssignment = (itemIndex, person) => {
    setAssignments((prev) => {
      const itemAssignments = prev[itemIndex] || [];
      if (itemAssignments.includes(person)) {
        return { ...prev, [itemIndex]: itemAssignments.filter((p) => p !== person) };
      } else {
        return { ...prev, [itemIndex]: [...itemAssignments, person] };
      }
    });
  };

  // Split evenly assigns each item to all people
  const splitEvenly = () => {
    const newAssignments = {};
    items.forEach((_, i) => {
      newAssignments[i] = [...people.filter((p) => p.trim() !== "")];
    });
    setAssignments(newAssignments);

    // Navigate to summary page
    navigate("/summary", {
      state: { people, items, assignments: newAssignments, tip, tax },
    });
  };

  const subtotal = items.reduce(
    (sum, item) => sum + (parseFloat(item.price) || 0),
    0
  );
  const total = subtotal + parseFloat(tip || 0) + parseFloat(tax || 0);

  return (
    <div className="assign-container">
      <h2>Assign Items</h2>

      {/* People Section */}
      <div className="people-section">
        {people.map((person, i) => (
          <div key={i} className="person-row">
            <input
              type="text"
              placeholder="Enter name"
              value={person}
              onChange={(e) => handlePersonChange(i, e.target.value)}
            />
            <button className="delete-person" onClick={() => removePerson(i)}> X</button>
          </div>
        ))}
        <button className="add-person" onClick={addPerson}>+ Add Person</button>
      </div>

      {/* Items Section */}
      <div className="items-section">

        {items.map((item, index) => (
          <div key={index} className="item-card">
            <div className="item-header">
              <span>{item.name || "Unnamed item"}</span>
              <span>${item.price || 0}</span>
            </div>
            <div className="tags">
              {people.map(
                (person, i) =>
                  person.trim() !== "" && (
                    <span
                      key={i}
                      className={`tag ${
                        assignments[index]?.includes(person) ? "selected" : ""
                      }`}
                      onClick={() => toggleAssignment(index, person)}
                    >
                      {person}
                    </span>
                  )
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary Section */}
      <div className="summary-box">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Tip: ${parseFloat(tip || 0).toFixed(2)}</p>
        <p>Tax: ${parseFloat(tax || 0).toFixed(2)}</p>
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>

      <div className="split-btn-container">
          <button className="split-btn" onClick={() => navigate("/summary")}>Split Evenly →</button>
        </div>

    </div>
  );
};

export default AssignItems;