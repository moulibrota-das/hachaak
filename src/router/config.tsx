import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import ProductPage from "../pages/product/page";
import ProductCollectionPage from "../pages/collection/page";
import AdminLogin from "../pages/admin/login/page";
import ProtectedRoute from "../pages/admin/ProtectedRoute";
import AdminDashboard from "../pages/admin/dashboard/page";

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
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
