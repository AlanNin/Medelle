import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import SignInPage from "@/pages/sign-in";
import AgendaPage from "@/pages/agenda";
import PatientsPage from "@/pages/patients";
import ConsultationsPage from "@/pages/consultations";
import AccountSettingsPage from "@/pages/account-settings";
import AboutPage from "@/pages/about";

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: SignInPage,
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

const consultationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/consultations",
  component: ConsultationsPage,
});

const accountSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/account-settings",
  component: AccountSettingsPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

export const routeTree = rootRoute.addChildren([
  signInRoute,
  agendaRoute,
  patientsRoute,
  consultationsRoute,
  accountSettingsRoute,
  aboutRoute,
]);
