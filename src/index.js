import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// AuthContext Provider
import {AuthContextProvider} from './context/AuthContext';
import {ThemeContextProvider} from './context/ThemeContext';


ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);