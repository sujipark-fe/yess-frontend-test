import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './assets/style/index.scss';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
