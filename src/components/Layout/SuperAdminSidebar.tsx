
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  CreditCard,
  Receipt,
  ChevronLeft,
  ChevronRight,
  Settings,
  LogOut,
  Users,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { t } = useTranslation();
  const { logout } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <h2 className="text-xl font-bold text-sidebar-foreground gradient-heading">
            Smart POS Admin
          </h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="rounded-full"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          <SidebarLink 
            to="/superadmin" 
            icon={<LayoutDashboard />} 
            label={t("dashboard")} 
            collapsed={collapsed}
            active={location.pathname === "/superadmin"} 
          />
          <SidebarLink 
            to="/superadmin/stores" 
            icon={<Store />} 
            label={t("stores")} 
            collapsed={collapsed}
            active={location.pathname.startsWith("/superadmin/stores")} 
          />
          <SidebarLink 
            to="/superadmin/subscriptions" 
            icon={<CreditCard />} 
            label={t("subscriptions")} 
            collapsed={collapsed}
            active={location.pathname.startsWith("/superadmin/subscriptions")} 
          />
          <SidebarLink 
            to="/superadmin/payments" 
            icon={<Receipt />} 
            label={t("payments")} 
            collapsed={collapsed}
            active={location.pathname.startsWith("/superadmin/payments")} 
          />
          <SidebarLink 
            to="/superadmin/users" 
            icon={<Users />} 
            label="Users" 
            collapsed={collapsed}
            active={location.pathname.startsWith("/superadmin/users")} 
          />
          <SidebarLink 
            to="/superadmin/settings" 
            icon={<Settings />} 
            label={t("settings")} 
            collapsed={collapsed}
            active={location.pathname.startsWith("/superadmin/settings")} 
          />
        </nav>
      </div>

      <div className="p-4">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
            collapsed ? "px-2" : "px-4"
          )}
          onClick={logout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          {!collapsed && <span>{t("logout")}</span>}
        </Button>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  active: boolean;
}

function SidebarLink({ to, icon, label, collapsed, active }: SidebarLinkProps) {
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start hover:text-sidebar-foreground hover:bg-sidebar-accent",
          collapsed ? "px-2" : "px-4",
          active ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-foreground/70"
        )}
      >
        <span className="h-5 w-5 mr-2">{icon}</span>
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
}
