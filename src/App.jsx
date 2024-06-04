
import Layout from "./Pages/Layout"
import './App.css';
import { AppProvider } from "./Contexts/AppContext";
import { UserProvider } from "./Contexts/UserContext";
import { ViewProvider } from "./Contexts/ViewContext";
import i18next from "i18next";

import AdminLayout from "./Admin/AdminLayout";
import {Routes, Route } from "react-router-dom";

import global_en from "./locales/en/global.json";
import global_fr from "./locales/fr/global.json";
import global_kn from "./locales/kn/global.json";
import { I18nextProvider } from "react-i18next";


i18next.init({
  interpolation: {escapeValue:false},
  lng: "en",
  resources: {
    en: {
      global:global_en
    },
    fr: {
      global: global_fr
    },
    kn: {
      global: global_kn
    }
  }
});

function App() {
  return (
    <I18nextProvider i18n={i18next}>
      <AppProvider>
        <UserProvider>
          <ViewProvider>
            <Routes>
              <Route path="/*" index element={<Layout />} />
              <Route path="/admin/*" element={<AdminLayout />} />
            </Routes>
          </ViewProvider>
        </UserProvider>
      </AppProvider>
    </I18nextProvider>
    
  )
}

export default App
