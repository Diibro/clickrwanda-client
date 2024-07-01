
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {BrowserRouter } from 'react-router-dom';
import ErrorFallback from './error/ErrorFallback.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
      <BrowserRouter FallbackComponent={ErrorFallback}>
        <App />
      </BrowserRouter>,
)
