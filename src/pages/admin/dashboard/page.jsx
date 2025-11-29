import { useState } from "react";
import supabase from "../../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("list");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen ">
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <div>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-black text-white px-3 py-1 rounded"
          >
            {loading ? "Signing out..." : "Sign out"}
          </button>
        </div>
      </header>

      <main className="p-4 md:p-6">
        {/* <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">Orders: 0</div>
          <div className="bg-white p-4 rounded shadow">Products: 0</div>
          <div className="bg-white p-4 rounded shadow">Users: 0</div>
        </section> */}

        <section className="mt-2 grid grid-cols-1 gap-6">
          <div>
            {view === "list" ? (
              <ProductList
                onCreate={() => setView("create")}
                onView={(product) => {
                  setSelectedProduct(product);
                  setView("detail");
                }}
                onEdit={(product) => {
                  setSelectedProduct(product);
                  setView("edit");
                }}
              />
            ) : view === "create" ? (
              <ProductForm
                onSuccess={() => setView("list")}
                onCancel={() => setView("list")}
              />
            ) : view === "edit" ? (
              <ProductForm
                initialData={selectedProduct}
                onSuccess={() => {
                  setSelectedProduct(null);
                  setView("list");
                }}
                onCancel={() => {
                  setSelectedProduct(null);
                  setView("list");
                }}
              />
            ) : (
              <ProductDetail
                product={selectedProduct}
                onBack={() => {
                  setSelectedProduct(null);
                  setView("list");
                }}
                onEdit={(product) => {
                  setSelectedProduct(product);
                  setView("edit");
                }}
              />
            )}
          </div>
          <div className="bg-white p-4 rounded shadow">
            Recent activity will appear here.
          </div>
        </section>
      </main>
    </div>
  );
}
