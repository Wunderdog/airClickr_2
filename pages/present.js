import Present from "../app/components/present";
import DefaultLayout from "../app/components/present";

const routes = [
  {
    path: "/present",
    exact: true,
    component: Present,
    layout: DefaultLayout,
  }
];
export default routes;