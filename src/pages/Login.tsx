
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { useTranslation } from "@/context/LanguageContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  const { isAuthenticated, isSuperuser, login } = useApp();
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState<"store" | "superadmin">("store");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(username, password);
    } catch (error) {
      toast.error("Invalid username or password");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    if (isSuperuser) {
      return <Navigate to="/superadmin" />;
    } else {
      return <Navigate to="/" />;
    }
  }

  const fillStoreDemo = () => {
    setUsername("demo");
    setPassword("password");
  };

  const fillSuperAdminDemo = () => {
    setUsername("superadmin");
    setPassword("xAI2025");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-pos-background to-background">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold gradient-heading mb-2">
            Smart POS SAAS
          </h1>
          <p className="text-muted-foreground">
            {t("login")}
          </p>
        </div>

        <div className="bg-card/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-border">
          <Tabs 
            defaultValue="store" 
            value={loginType}
            onValueChange={(value) => setLoginType(value as "store" | "superadmin")}
            className="mb-4"
          >
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="store">Store Login</TabsTrigger>
              <TabsTrigger value="superadmin">Superadmin</TabsTrigger>
            </TabsList>
          </Tabs>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                {t("username")}
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={loginType === "store" ? "demo" : "superadmin"}
                required
                disabled={isLoading}
                autoComplete="username"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  {t("password")}
                </label>
                <a
                  href="#"
                  className="text-xs text-primary hover:underline"
                >
                  {t("forgotPassword")}
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full pos-button"
            >
              {isLoading ? "Loading..." : t("signIn")}
            </Button>

            <div className="text-center text-xs text-muted-foreground pt-4">
              <p>Demo credentials:</p>
              {loginType === "store" ? (
                <>
                  <p>Username: demo</p>
                  <p>Password: password</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={fillStoreDemo} 
                    className="mt-2 text-xs"
                  >
                    Auto-fill demo credentials
                  </Button>
                </>
              ) : (
                <>
                  <p>Username: superadmin</p>
                  <p>Password: xAI2025</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={fillSuperAdminDemo} 
                    className="mt-2 text-xs"
                  >
                    Auto-fill superadmin credentials
                  </Button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
