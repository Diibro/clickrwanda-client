
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import {BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './error/ErrorFallback.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ErrorBoundary>
      <BrowserRouter FallbackComponent={ErrorFallback}>
        <App />
      </BrowserRouter>
    </ErrorBoundary>,
)
