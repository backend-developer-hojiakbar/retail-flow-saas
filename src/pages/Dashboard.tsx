
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { SalesChart } from "@/components/Dashboard/SalesChart";
import { LowStockProducts } from "@/components/Dashboard/LowStockProducts";
import { useTranslation } from "@/context/LanguageContext";
import { useApp } from "@/context/AppContext";
import { ShoppingCart, DollarSign, Wallet } from "lucide-react";

export default function Dashboard() {
  const { t } = useTranslation();
  const { currentStore } = useApp();
  
  // In a real app, these values would come from API calls
  const totalSalesUZS = 125000000;
  const formattedSalesUZS = new Intl.NumberFormat().format(totalSalesUZS);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">{t("dashboard")}</h1>
        <p className="text-muted-foreground mt-1">
          {currentStore?.name || "Demo Store"}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          title={t("dailySales")}
          value={`${formattedSalesUZS} UZS`}
          icon={<ShoppingCart className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title={t("registerBalance")}
          value={`${new Intl.NumberFormat().format(1500000)} UZS`}
          icon={<Wallet className="h-4 w-4" />}
          description="Main Register"
        />
        <StatsCard
          title={t("lowStock")}
          value="5"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 2, isPositive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <SalesChart title={t("monthlySales")} />
        </div>
        <div>
          <LowStockProducts />
        </div>
      </div>
    </div>
  );
}
