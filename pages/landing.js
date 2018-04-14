import Landing from "../app/components/landing";
import DefaultLayout from "../app/components/layout";

const routes = [
  {
    path: "/landing",
    exact: true,
    component: Landing,
    layout: DefaultLayout,
  }
];
export default routes;