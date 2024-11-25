import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './style.css';
import './i18n.js';
import {StrictMode} from "react";
import {PrimeReactProvider} from "primereact/api";


ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode>
        <PrimeReactProvider>
            <App />
        </PrimeReactProvider>
    </StrictMode>
);