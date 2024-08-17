import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import App from './App.jsx';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
