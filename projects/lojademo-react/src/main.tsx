import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { APP_NAME } from './config';
import './index.css';

document.title = `${APP_NAME} – Catálogo de E-commerce`;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
