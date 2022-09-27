import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.ts';
import App from './App';
import GlobalStyle from './global';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle/>
    <App />
  </React.StrictMode>
);
