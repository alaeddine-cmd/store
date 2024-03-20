import React from 'react';
import { createRoot } from 'react-dom/client'; // Corrected import
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById("root");
const root = createRoot(container); // Create root with the container
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
