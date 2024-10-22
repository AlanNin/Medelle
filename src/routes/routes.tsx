import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import SignInPage from "@/pages/sign-in";
import AgendaPage from "@/pages/agenda";
import SignUpPage from "@/pages/sign-up";

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: SignInPage,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/sign-up",
  component: SignUpPage,
});

const agendaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/agenda",
  component: AgendaPage,
});

export const routeTree = rootRoute.addChildren([
  signInRoute,
  signUpRoute,
  agendaRoute,
]);
