import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ProductPage from "../pages/product/page";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
