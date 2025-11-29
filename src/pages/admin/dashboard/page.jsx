import { useState } from "react";
import supabase from "../../../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import ProductForm from "./components/ProductForm";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

      <main className="p-6">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">Orders: 0</div>
          <div className="bg-white p-4 rounded shadow">Products: 0</div>
          <div className="bg-white p-4 rounded shadow">Users: 0</div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6">
          <div>
            <ProductForm />
          </div>
          <div className="bg-white p-4 rounded shadow">
            Recent activity will appear here.
          </div>
        </section>
      </main>
    </div>
  );
}
