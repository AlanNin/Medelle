import Layout from "@/components/layout";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Layout />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
