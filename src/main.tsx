import App from "./App";
import { ChatContextProvider } from "./contexts/ChatContext";
import "./index.css";
import { AuthContextProvider } from "@contexts/AuthContext";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
