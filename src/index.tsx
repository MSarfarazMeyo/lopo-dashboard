import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { HistoryProvider } from './providers/history-context-provider';
import { ReactQueryProvider } from './providers/react-query-provider';
import RefreshTokenProvider from './providers/refresh-token-provider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <HistoryProvider>
        <ReactQueryProvider>
          <RefreshTokenProvider>  <App /></RefreshTokenProvider>
        </ReactQueryProvider>
      </HistoryProvider>


    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
