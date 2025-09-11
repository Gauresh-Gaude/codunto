// import React from "react";
// import "./Main.css";

// const Heading = () => {
//   return (
//     <div className="container">
//       <div className="icon">
//         <span role="img" aria-label="scan">📷</span>
//       </div>
//       <h1 className="title">Scan. Tap. Split.</h1>
//       <p className="subtitle">
//         Snap the receipt, tap your items, see who owes what. <br />
//         No sign-ups, no math, no drama.
//       </p>
//       <div className="buttons">
//         <button className="scan-btn">📷 Scan Receipt</button>
//         <button className="manual-btn">Enter Manually</button>
//       </div>
//     </div>
//   );
// };

// export default Heading;

import React, { useState } from "react";
import "./Main.css";

const Heading = () => {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a receipt image!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/api/scan", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResponse(data.result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="icon">📷</div>
      <h1 className="title">Scan. Tap. Split.</h1>
      <p className="subtitle">
        Snap the receipt, tap your items, see who owes what. <br />
        No sign-ups, no math, no drama.
      </p>
      <div className="buttons">
        <input type="file" onChange={handleFileChange} />
        <button className="scan-btn" onClick={handleUpload}>
          📷 Scan Receipt
        </button>
        <button className="manual-btn">Enter Manually</button>
      </div>

      {response && (
        <div className="result-box">
          <h3>Scan Result:</h3>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default Heading;
