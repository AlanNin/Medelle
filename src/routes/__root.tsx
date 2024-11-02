import Layout from "@/components/layout";
import {
  createRootRoute,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const rootRoute = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const router = useRouterState();

  return (
    <>
      <Layout />
      <main className={`${router.location.pathname !== "/" && "mt-11"}`}>
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </>
  );
}
