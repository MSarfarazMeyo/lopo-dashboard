import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HistoryProvider } from "./providers/history-context-provider";
import { ReactQueryProvider } from "./providers/react-query-provider";
import RefreshTokenProvider from "./providers/refresh-token-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HistoryProvider>
        <ReactQueryProvider>
          <RefreshTokenProvider>
            <App />
          </RefreshTokenProvider>
        </ReactQueryProvider>
      </HistoryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
