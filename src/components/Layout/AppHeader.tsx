
import { useApp } from "@/context/AppContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/context/LanguageContext";

export function AppHeader() {
  const { currentUser, currentStore, exchangeRate, logout } = useApp();
  const { t } = useTranslation();

  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-3 bg-background z-10">
      <div className="flex items-center">
        {currentStore && (
          <div className="text-sm">
            <p className="text-muted-foreground">
              1 USD = {exchangeRate.usdToUzs} UZS
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <LanguageSelector />
        <ThemeToggle />

        {currentUser && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarFallback className="bg-pos-primary text-white">
                  {currentUser.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex flex-col px-2 py-1.5">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.username}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>{t("logout")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
