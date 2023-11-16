import { Routes, Route } from "react-router-dom"
import Layout from "./Pages/Layout"
import './App.css';
function App() {

  return (
    <>
      <Routes>
        <Route index path="/*" element={<Layout />} />
        
      </Routes>
    </>
  )
}

export default App
