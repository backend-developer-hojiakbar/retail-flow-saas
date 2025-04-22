
import { useTranslation } from "@/context/LanguageContext";

export default function Settings() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">{t("settings")}</h1>
      </div>
      
      <div className="flex flex-col items-center justify-center p-10">
        <p className="text-muted-foreground text-lg">Settings will be implemented in the next iteration.</p>
      </div>
    </div>
  );
}
