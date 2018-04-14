import {configureRoutes} from "pawjs/src/utils/bundler";
// routes
import * as Home from "./pages/home";
import * as About from "./pages/about";
import * as Landing from "./pages/landing";
import * as Present from "./pages/present";
import * as Slideshow from "./pages/slideshow";
import * as Control from "./pages/control";



export default configureRoutes([
  Home,
  About,
  Landing,
  Present,
  Control,
  Slideshow
]);