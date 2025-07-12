import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "../shared/styles/global.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
