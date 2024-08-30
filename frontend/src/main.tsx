import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./styles/utopia.space.css";
import "./styles/utopia.step.css";
import "./styles/variables.css";
import "./styles/globals.css";
import "./styles/globals.vars.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
