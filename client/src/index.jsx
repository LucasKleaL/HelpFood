import React from 'react';
import ReactDOM from 'react-dom/client';
import Routes from './Routes';
import './styles/global.css';

window.url = "http://localhost:3001"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Routes />
);
