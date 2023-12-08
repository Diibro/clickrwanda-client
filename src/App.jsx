
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
        <Layout />
        </ViewProvider>
      </UserProvider>
    </AppProvider>
  )
}

export default App
