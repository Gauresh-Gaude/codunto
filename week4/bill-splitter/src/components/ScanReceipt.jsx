// import React, { useState } from "react";
// import "./Main.css";

// const ScanReceipt = ({ onScanComplete }) => {
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState(null);

//   const handleUpload = async () => {
//     if (!file) return alert("Please upload a receipt image!");
//     setLoading(true);

//     // Simulate API scan
//     setTimeout(() => {
//       setLoading(false);
//       // Sample items detected from receipt
//       onScanComplete([
//         { name: "Bibb Lettuce Salad", price: 17 },
//         { name: "STEAK FRITES", price: 34 },
//         { name: "Market Salmon", price: 29 },
//         { name: "FIRE!", price: 0 },
//       ]);
//     }, 2000);
//   };

//   return (
//     <div className="scan-container">
//       <h2>Scan Receipt</h2>
//       <p>Take a photo or upload an image of your receipt</p>

//       <input type="file" onChange={(e) => setFile(e.target.files[0])} />

//       {loading ? (
//         <div className="loader">Looking at receipt...</div>
//       ) : (
//         <button className="scan-btn" onClick={handleUpload}>
//           Upload & Scan
//         </button>
//       )}
//     </div>
//   );
// };

// export default ScanReceipt;

import React from 'react'

function ScanReceipt() {
  return (
    <div>ScanReceipt</div>
  )
}

export default ScanReceipt
