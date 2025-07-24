import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./css/reset.css";
import "./css/index.css";
import App from "./App";

import { UserProvider } from "./context/UserProvider";
import { UserProfileProvider } from "./context/UserProfileProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <UserProfileProvider>
          <App />
        </UserProfileProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
