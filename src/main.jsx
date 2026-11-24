import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Chart_d3/", //https://github.com/magnoliaceae-mappa/Chart_d3
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
