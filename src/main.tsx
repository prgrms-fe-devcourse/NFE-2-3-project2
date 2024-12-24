import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./css/index.css";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  // StrickMode 제거
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
