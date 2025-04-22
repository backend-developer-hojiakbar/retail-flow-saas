
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";
import { useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { t } = useTranslation();
  const { logout } = useApp();
  const [collapsed, setCollapsed] = useState(false);

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
          <SidebarLink to="/" icon={<Home />} label={t("dashboard")} collapsed={collapsed} />
          <SidebarLink to="/pos" icon={<ShoppingCart />} label={t("pos")} collapsed={collapsed} />
          <SidebarLink to="/products" icon={<Package />} label={t("products")} collapsed={collapsed} />
          <SidebarLink to="/inventory" icon={<Package />} label={t("inventory")} collapsed={collapsed} />
          <SidebarLink to="/reports" icon={<BarChart3 />} label={t("reports")} collapsed={collapsed} />
          <SidebarLink to="/installments" icon={<Calendar />} label={t("installments")} collapsed={collapsed} />
          <SidebarLink to="/settings" icon={<Settings />} label={t("settings")} collapsed={collapsed} />
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
}

function SidebarLink({ to, icon, label, collapsed }: SidebarLinkProps) {
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start text-sidebar-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent",
          collapsed ? "px-2" : "px-4"
        )}
      >
        <span className="h-5 w-5 mr-2">{icon}</span>
        {!collapsed && <span>{label}</span>}
      </Button>
    </Link>
  );
}
