import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import { TodoProvider } from './context/TodoContext'

const i18n = {
  locale: 'en',
  translations: {
    Polaris: {},
  },
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider i18n={i18n}>
        <TodoProvider>
          <App />
        </TodoProvider>
    </AppProvider>
  </React.StrictMode>
);