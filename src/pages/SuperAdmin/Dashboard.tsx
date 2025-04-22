
import { useTranslation } from "@/context/LanguageContext";
import { StatsCard } from "@/components/Dashboard/StatsCard";
import { Building, CreditCard, Wallet, Users } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Sample data for the superadmin dashboard
const activeStoresData = [
  { month: "Jan", count: 12 },
  { month: "Feb", count: 16 },
  { month: "Mar", count: 22 },
  { month: "Apr", count: 28 },
  { month: "May", count: 35 },
  { month: "Jun", count: 42 },
  { month: "Jul", count: 48 },
  { month: "Aug", count: 55 },
  { month: "Sep", count: 60 },
  { month: "Oct", count: 67 },
  { month: "Nov", count: 73 },
  { month: "Dec", count: 78 }
];

const revenueData = [
  { month: "Jan", revenue: 3200000 },
  { month: "Feb", revenue: 4500000 },
  { month: "Mar", revenue: 5800000 },
  { month: "Apr", revenue: 7200000 },
  { month: "May", revenue: 8500000 },
  { month: "Jun", revenue: 10200000 },
  { month: "Jul", revenue: 12500000 },
  { month: "Aug", revenue: 14000000 },
  { month: "Sep", revenue: 16500000 },
  { month: "Oct", revenue: 18700000 },
  { month: "Nov", revenue: 20500000 },
  { month: "Dec", revenue: 22800000 }
];

const subscriptionDistribution = [
  { name: "Free", value: 25 },
  { name: "Silver", value: 35 },
  { name: "Gold", value: 22 },
  { name: "Platinum", value: 15 },
  { name: "VIP", value: 3 }
];

export default function SuperAdminDashboard() {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">{t("superadmin")} {t("dashboard")}</h1>
        <p className="text-muted-foreground mt-1">
          System overview and statistics
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Stores"
          value="78"
          icon={<Building className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Users"
          value="215"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 18, isPositive: true }}
        />
        <StatsCard
          title="Monthly Revenue"
          value={`${new Intl.NumberFormat().format(22800000)} UZS`}
          icon={<Wallet className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Pending Payments"
          value="5"
          icon={<CreditCard className="h-4 w-4" />}
          trend={{ value: 2, isPositive: false }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Active Stores Growth</CardTitle>
            <CardDescription>Monthly active stores count for the current year</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeStoresData}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Active Stores" fill="#3498db" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <CardDescription>Subscription revenue for the current year</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip formatter={(value) => new Intl.NumberFormat().format(value as number) + " UZS"}/>
                <Legend />
                <Bar dataKey="revenue" name="Revenue (UZS)" fill="#2ecc71" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Subscription Distribution</CardTitle>
            <CardDescription>Distribution of stores by subscription tier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subscriptionDistribution.map((sub) => (
                <div key={sub.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-${sub.name.toLowerCase()}`} 
                         style={{ 
                           backgroundColor: 
                             sub.name === "Free" ? "#cbd5e1" : 
                             sub.name === "Silver" ? "#94a3b8" : 
                             sub.name === "Gold" ? "#f59e0b" : 
                             sub.name === "Platinum" ? "#64748b" : 
                             "#6366f1" 
                         }} />
                    <span>{sub.name}</span>
                  </div>
                  <span>{sub.value} stores</span>
                </div>
              ))}
            </div>
            <div className="mt-6 h-2 bg-gray-200 rounded-full overflow-hidden">
              {subscriptionDistribution.map((sub, index) => {
                const totalValue = subscriptionDistribution.reduce((acc, curr) => acc + curr.value, 0);
                const percentage = (sub.value / totalValue) * 100;
                const colors = ["#cbd5e1", "#94a3b8", "#f59e0b", "#64748b", "#6366f1"];
                return (
                  <div
                    key={sub.name}
                    className="h-full float-left"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: colors[index % colors.length]
                    }}
                  />
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
            <CardDescription>Latest subscription payments</CardDescription>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-2 font-medium">Store</th>
                  <th className="pb-2 font-medium">Plan</th>
                  <th className="pb-2 font-medium">Date</th>
                  <th className="pb-2 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2">Gadget Galaxy</td>
                  <td className="py-2">Gold</td>
                  <td className="py-2">2025-04-18</td>
                  <td className="py-2">399,000 UZS</td>
                </tr>
                <tr>
                  <td className="py-2">DigitalWorld</td>
                  <td className="py-2">Platinum</td>
                  <td className="py-2">2025-04-17</td>
                  <td className="py-2">799,000 UZS</td>
                </tr>
                <tr>
                  <td className="py-2">Mobile City</td>
                  <td className="py-2">Silver</td>
                  <td className="py-2">2025-04-15</td>
                  <td className="py-2">199,000 UZS</td>
                </tr>
                <tr>
                  <td className="py-2">iCenter</td>
                  <td className="py-2">Gold</td>
                  <td className="py-2">2025-04-14</td>
                  <td className="py-2">399,000 UZS</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
