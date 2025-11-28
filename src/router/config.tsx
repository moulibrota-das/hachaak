import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ProductPage from "../pages/product/page";
import ProductCollectionPage from "../pages/collection/page";

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
    path: "/collection",
    element: <ProductCollectionPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
