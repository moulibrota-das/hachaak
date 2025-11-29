import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import supabase from "../../lib/supabaseClient";

export default function ProtectedRoute({ children }) {
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setAuthenticated(Boolean(data?.session));
      setChecked(true);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  if (!checked) return null;

  if (!authenticated) return <Navigate to="/admin/login" replace />;

  return children;
}
