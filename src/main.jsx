
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {BrowserRouter } from 'react-router-dom';
import ErrorFallback from './error/ErrorFallback.jsx';
import { HelmetProvider } from 'react-helmet-async';
import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

axios.defaults.withCredentials = true;
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(

    <HelmetProvider>
      <BrowserRouter FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </HelmetProvider>
      ,
)


