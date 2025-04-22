
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "@/context/LanguageContext";
import { LayoutDashboard, Users, Receipt, Settings } from "lucide-react";

export function SuperAdminNav() {
  const { t } = useTranslation();
  
  return (
    <Card className="p-4 mb-6 bg-sidebar">
      <div className="flex flex-wrap gap-3 justify-center">
        <Button asChild variant="outline" className="bg-background">
          <Link to="/superadmin">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            {t("dashboard")}
          </Link>
        </Button>
        <Button asChild variant="outline" className="bg-background">
          <Link to="/superadmin/users">
            <Users className="mr-2 h-4 w-4" />
            {t("users")}
          </Link>
        </Button>
        <Button asChild variant="outline" className="bg-background">
          <Link to="/superadmin/payments">
            <Receipt className="mr-2 h-4 w-4" />
            {t("payments")}
          </Link>
        </Button>
        <Button asChild variant="outline" className="bg-background">
          <Link to="/superadmin/settings">
            <Settings className="mr-2 h-4 w-4" />
            {t("settings")}
          </Link>
        </Button>
      </div>
    </Card>
  );
}
