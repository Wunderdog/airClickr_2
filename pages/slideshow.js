import Slideshow from "../app/components/slideshow";
import DefaultLayout from "../app/components/slideshow";

const routes = [
  {
    path: "/slideshow",
    exact: true,
    component: Slideshow,
    layout: DefaultLayout,
  }
];
export default routes;