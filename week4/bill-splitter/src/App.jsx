import React from 'react'
import Heading from './components/Heading.jsx'
import ManualEntry from './components/ManualEntry.jsx'
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'

function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Heading />} />
          <Route path="/manual" element={<ManualEntry />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
