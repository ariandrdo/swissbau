import { Navigate, Outlet } from "react-router";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export function ProtectedRoute() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuth(!!data.session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuth(!!session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (isAuth === null) return null;
  return isAuth ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
