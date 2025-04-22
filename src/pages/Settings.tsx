
import { useTranslation } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";

export default function Settings() {
  const { t } = useTranslation();
  const { currentStore } = useApp();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">{t("settings")}</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>{t("store")} {t("information")}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentStore && (
              <div className="space-y-2">
                <p><strong>{t("name")}:</strong> {currentStore.name}</p>
                <p><strong>{t("subscription")}:</strong> {currentStore.subscription}</p>
                <p><strong>{t("status")}:</strong> {currentStore.status}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
