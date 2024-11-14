import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "../global.css";
import UpdaterApp from "./app";

// import { ThemeProvider } from "./providers/theme-provider";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <UpdaterApp />
    </StrictMode>
  );
}
