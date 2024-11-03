import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";
import { routeTree } from "./routes/routes";
import { Toaster } from "@/components/ui/sonner";
import "./global.css";
import ReactReduxProvider from "./providers/react-redux";
import ReactQueryProvider from "./providers/react-query";
import { AppConfigProvider } from "./providers/app-config-provider";

// import { ThemeProvider } from "./providers/theme-provider";

const memoryHistory = createMemoryHistory({
  initialEntries: ["/"],
});

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  history: memoryHistory,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ReactQueryProvider>
        <AppConfigProvider>
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
          <ReactReduxProvider>
            <RouterProvider router={router} />
          </ReactReduxProvider>
          <Toaster />
          {/* </ThemeProvider> */}
        </AppConfigProvider>
      </ReactQueryProvider>
    </StrictMode>
  );
}
