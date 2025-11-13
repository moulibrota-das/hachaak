import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
