import React from "react";
import "./Main.css";

const Heading = () => {
  return (
    <div className="container">
      <div className="icon">
        <span role="img" aria-label="scan">📷</span>
      </div>
      <h1 className="title">Scan. Tap. Split.</h1>
      <p className="subtitle">
        Snap the receipt, tap your items, see who owes what. <br />
        No sign-ups, no math, no drama.
      </p>
      <div className="buttons">
        <button className="scan-btn">📷 Scan Receipt</button>
        <button className="manual-btn">Enter Manually</button>
      </div>
    </div>
  );
};

export default Heading;
