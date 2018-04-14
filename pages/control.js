import Control from "../app/components/control";
import DefaultLayout from "../app/components/control";

const routes = [
  {
    path: "/control",
    exact: true,
    component: Control,
    layout: DefaultLayout,
  }
];
export default routes;