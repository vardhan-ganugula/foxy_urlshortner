import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SidebarContextProvider } from "./contexts/SidebarContext.jsx";
import { ProfileContextProvider } from "./contexts/ProfileProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProfileContextProvider>
        <SidebarContextProvider>
          <App />
        </SidebarContextProvider>
      </ProfileContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
