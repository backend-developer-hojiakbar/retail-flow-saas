
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Reports() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">{t("reports")}</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>{t("sales")} {t("report")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t("no_data")}</p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>{t("inventory")} {t("report")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{t("no_data")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
