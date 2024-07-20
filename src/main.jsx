
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {BrowserRouter } from 'react-router-dom';
import ErrorFallback from './error/ErrorFallback.jsx';
import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios'

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')).render(
    <HelmetProvider>
      <BrowserRouter FallbackComponent={ErrorFallback}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
      ,
)


