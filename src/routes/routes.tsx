import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import SignInPage from "@/pages/sign-in";
import AgendaPage from "@/pages/agenda";
import SignUpPage from "@/pages/sign-up";
import PatientsPage from "@/pages/patients";

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

const patientsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/patients",
  component: PatientsPage,
});

export const routeTree = rootRoute.addChildren([
  signInRoute,
  signUpRoute,
  agendaRoute,
  patientsRoute,
]);
