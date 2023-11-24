import { Routes, Route } from "react-router-dom"
import Layout from "./Pages/Layout"
import './App.css';
import { AppProvider } from "./Contexts/AppContext";
function App() {
  
  return (
    <AppProvider>
      <Routes>
        <Route index path="/*" element={<Layout />} />
      </Routes>
    </AppProvider>
  )
}

export default App
