import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SidebarContextProvider } from "./contexts/SidebarContext.jsx";
import { ProfileContextProvider } from "./contexts/ProfileProvider.jsx";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProfileContextProvider>
        <SidebarContextProvider>
          <App />
        </SidebarContextProvider>
      </ProfileContextProvider>
    </BrowserRouter>
    <ToastContainer  className='fixed'
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
  </React.StrictMode>
);
