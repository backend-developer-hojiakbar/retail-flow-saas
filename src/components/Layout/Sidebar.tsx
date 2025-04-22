import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  ShoppingCart,
  Package,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Calendar,
  Settings,
  LogOut,
  FileText,
  CreditCard,
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
            Smart POS
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
            to="/" 
            icon={<Home />} 
            label={t("dashboard")} 
            collapsed={collapsed} 
            active={location.pathname === "/"} 
          />
          <SidebarLink 
            to="/pos" 
            icon={<ShoppingCart />} 
            label={t("pos")} 
            collapsed={collapsed} 
            active={location.pathname === "/pos"} 
          />
          <SidebarLink 
            to="/sales" 
            icon={<FileText />} 
            label={t("sales")} 
            collapsed={collapsed} 
            active={location.pathname === "/sales"} 
          />
          <SidebarLink 
            to="/products" 
            icon={<Package />} 
            label={t("products")} 
            collapsed={collapsed} 
            active={location.pathname === "/products"} 
          />
          <SidebarLink 
            to="/inventory" 
            icon={<Package />} 
            label={t("inventory")} 
            collapsed={collapsed} 
            active={location.pathname === "/inventory"} 
          />
          <SidebarLink 
            to="/reports" 
            icon={<BarChart3 />} 
            label={t("reports")} 
            collapsed={collapsed} 
            active={location.pathname === "/reports"} 
          />
          <SidebarLink 
            to="/installments" 
            icon={<CreditCard />} 
            label={t("installments")} 
            collapsed={collapsed}
            active={location.pathname.startsWith("/installments")} 
          />
          <SidebarLink 
            to="/settings" 
            icon={<Settings />} 
            label={t("settings")} 
            collapsed={collapsed} 
            active={location.pathname === "/settings"} 
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
          "w-full justify-start text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
          collapsed ? "px-2" : "px-4",
          active ? "bg-sidebar-accent" : ""
        )}
      >
        <span className="h-5 w-5 mr-2">{icon}</span>
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
}
