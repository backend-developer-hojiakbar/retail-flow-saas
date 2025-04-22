
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/context/LanguageContext";
import { Navigate, Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Layout/SuperAdminSidebar";
import { SuperAdminNav } from "@/components/Layout/SuperAdminNav"; 
import { AppHeader } from "@/components/Layout/AppHeader";

export function SuperAdminLayout() {
  const { isAuthenticated, isSuperuser } = useApp();
  const { t } = useTranslation();

  if (!isAuthenticated || !isSuperuser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex flex-col w-full overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-auto p-6">
          <SuperAdminNav />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
