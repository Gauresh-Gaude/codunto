import React from 'react'
import Heading from './components/Heading.jsx'
import ManualEntry from './components/ManualEntry.jsx'
import AssignItems from "./components/AssignItems.jsx";
import FinalSummary from './components/Summary.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Heading />} />
          <Route path="/manual" element={<ManualEntry />} />
          <Route path="/assign" element={<AssignItems />} />
          <Route path="/summary" element={<FinalSummary />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App