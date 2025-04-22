
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function SuperAdminSettings() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("general");
  
  // General settings state
  const [systemName, setSystemName] = useState("Smart POS SAAS");
  const [adminEmail, setAdminEmail] = useState("admin@smartpos.com");
  const [supportPhone, setSupportPhone] = useState("+998 99 999 9999");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  // Exchange rate settings state
  const [usdRate, setUsdRate] = useState("12500");
  const [autoUpdateRate, setAutoUpdateRate] = useState(true);
  const [rateUpdateFrequency, setRateUpdateFrequency] = useState("daily");
  
  // Notification settings state
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [telegramNotifications, setTelegramNotifications] = useState(true);
  const [telegramBotToken, setTelegramBotToken] = useState("1234567890:AAHfLpGBYVHk_JKL-ghJKLqw");
  const [smsApiKey, setSmsApiKey] = useState("abc123def456ghi789");
  
  // System message settings
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to Smart POS SAAS! The ultimate point of sale system for phone and accessory stores.");
  
  const handleSaveGeneral = () => {
    toast.success("General settings saved successfully");
  };
  
  const handleSaveExchangeRate = () => {
    toast.success("Exchange rate settings saved successfully");
  };
  
  const handleSaveNotifications = () => {
    toast.success("Notification settings saved successfully");
  };
  
  const handleSaveSystemMessages = () => {
    toast.success("System messages saved successfully");
  };
  
  const handleBackupDatabase = () => {
    toast.success("Database backup started. You will be notified when complete.");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">{t("superadmin")} {t("settings")}</h1>
        <p className="text-muted-foreground mt-1">
          Configure system-wide settings
        </p>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="exchange">Exchange Rate</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="messages">System Messages</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic system settings and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemName">System Name</Label>
                  <Input 
                    id="systemName" 
                    value={systemName} 
                    onChange={(e) => setSystemName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="adminEmail">Admin Email</Label>
                  <Input 
                    id="adminEmail" 
                    type="email"
                    value={adminEmail} 
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="supportPhone">Support Phone</Label>
                  <Input 
                    id="supportPhone" 
                    value={supportPhone} 
                    onChange={(e) => setSupportPhone(e.target.value)}
                  />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    When enabled, only superadmins can access the system
                  </p>
                </div>
                <Switch 
                  id="maintenanceMode"
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral} className="pos-button">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="exchange">
          <Card>
            <CardHeader>
              <CardTitle>Exchange Rate Settings</CardTitle>
              <CardDescription>
                Configure currency exchange rate options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="usdRate">USD to UZS Exchange Rate</Label>
                  <Input 
                    id="usdRate" 
                    value={usdRate} 
                    onChange={(e) => setUsdRate(e.target.value)}
                  />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoUpdateRate">Auto Update Exchange Rate</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically update exchange rate from National Bank API
                  </p>
                </div>
                <Switch 
                  id="autoUpdateRate"
                  checked={autoUpdateRate}
                  onCheckedChange={setAutoUpdateRate}
                />
              </div>
              
              {autoUpdateRate && (
                <div className="space-y-2 pt-4">
                  <Label htmlFor="rateUpdateFrequency">Update Frequency</Label>
                  <select
                    id="rateUpdateFrequency"
                    value={rateUpdateFrequency}
                    onChange={(e) => setRateUpdateFrequency(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveExchangeRate} className="pos-button">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how system notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <Switch 
                    id="emailNotifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <Switch 
                    id="smsNotifications"
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="telegramNotifications">Telegram Notifications</Label>
                  <Switch 
                    id="telegramNotifications"
                    checked={telegramNotifications}
                    onCheckedChange={setTelegramNotifications}
                  />
                </div>
                
                <Separator className="my-4" />
                
                {telegramNotifications && (
                  <div className="space-y-2">
                    <Label htmlFor="telegramBotToken">Telegram Bot Token</Label>
                    <Input 
                      id="telegramBotToken" 
                      value={telegramBotToken} 
                      onChange={(e) => setTelegramBotToken(e.target.value)}
                    />
                  </div>
                )}
                
                {smsNotifications && (
                  <div className="space-y-2">
                    <Label htmlFor="smsApiKey">SMS Gateway API Key</Label>
                    <Input 
                      id="smsApiKey" 
                      value={smsApiKey} 
                      onChange={(e) => setSmsApiKey(e.target.value)}
                      type="password"
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications} className="pos-button">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>System Messages</CardTitle>
              <CardDescription>
                Configure messages displayed throughout the system
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Textarea 
                  id="welcomeMessage" 
                  value={welcomeMessage} 
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  rows={4}
                />
                <p className="text-sm text-muted-foreground">
                  This message is displayed on the login page
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSystemMessages} className="pos-button">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="backup">
          <Card>
            <CardHeader>
              <CardTitle>Database Backup</CardTitle>
              <CardDescription>
                Manage database backups and restoration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-4">
                <div>
                  <h3 className="font-medium text-lg">Automated Backups</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    The system performs daily backups at 3:00 AM
                  </p>
                  
                  <div className="space-y-2">
                    <Label>Backup Retention Period</Label>
                    <select
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      defaultValue="30"
                    >
                      <option value="7">7 days</option>
                      <option value="14">14 days</option>
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                    </select>
                  </div>
                </div>
                
                <Separator className="my-2" />
                
                <div>
                  <h3 className="font-medium text-lg">Manual Backup</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a backup manually when needed
                  </p>
                  
                  <Button onClick={handleBackupDatabase} className="pos-button">
                    Backup Now
                  </Button>
                </div>
                
                <Separator className="my-2" />
                
                <div>
                  <h3 className="font-medium text-lg">Recent Backups</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    List of recent database backups
                  </p>
                  
                  <div className="border rounded-md divide-y">
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Backup_20250422_0300.sql</p>
                        <p className="text-sm text-muted-foreground">2025-04-22 03:00</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Download</Button>
                        <Button variant="outline" size="sm">Restore</Button>
                      </div>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Backup_20250421_0300.sql</p>
                        <p className="text-sm text-muted-foreground">2025-04-21 03:00</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Download</Button>
                        <Button variant="outline" size="sm">Restore</Button>
                      </div>
                    </div>
                    <div className="p-3 flex justify-between items-center">
                      <div>
                        <p className="font-medium">Backup_20250420_0300.sql</p>
                        <p className="text-sm text-muted-foreground">2025-04-20 03:00</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Download</Button>
                        <Button variant="outline" size="sm">Restore</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
