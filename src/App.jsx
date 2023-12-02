import { Routes, Route } from "react-router-dom"
import Layout from "./Pages/Layout"
import './App.css';
import { AppProvider } from "./Contexts/AppContext";
import { UserProvider } from "./Contexts/UserContext";
import { ViewProvider } from "./Contexts/ViewContext";
function App() {
  
  return (
    <AppProvider>
      <UserProvider>
        <ViewProvider>
          <Routes>
            <Route index path="/*" element={<Layout />} />
          </Routes>
        </ViewProvider>
      </UserProvider>
    </AppProvider>
  )
}

export default App
