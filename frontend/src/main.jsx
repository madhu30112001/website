import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./output.css";
import { BrowserRouter } from "react-router-dom";
import StoreContextProvider from "./contextapi/contextapi.jsx";
createRoot(document.getElementById("root")).render(
  
    <StoreContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StoreContextProvider>
  
);
