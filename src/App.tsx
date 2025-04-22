
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AppLayout } from "@/components/Layout/AppLayout";
import { SuperAdminLayout } from "@/components/Layout/SuperAdminLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import POS from "./pages/POS";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Installments from "./pages/Installments";
import Settings from "./pages/Settings";
import SuperAdminDashboard from "./pages/SuperAdmin/Dashboard";
import Stores from "./pages/SuperAdmin/Stores";
import Subscriptions from "./pages/SuperAdmin/Subscriptions";
import Payments from "./pages/SuperAdmin/Payments";
import Users from "./pages/SuperAdmin/Users";
import SuperAdminSettings from "./pages/SuperAdmin/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              {/* Store Routes */}
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="pos" element={<POS />} />
                <Route path="sales" element={<Sales />} />
                <Route path="products" element={<Products />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="reports" element={<Reports />} />
                <Route path="installments" element={<Installments />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              
              {/* SuperAdmin Routes */}
              <Route path="/superadmin" element={<SuperAdminLayout />}>
                <Route index element={<SuperAdminDashboard />} />
                <Route path="stores" element={<Stores />} />
                <Route path="subscriptions" element={<Subscriptions />} />
                <Route path="payments" element={<Payments />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<SuperAdminSettings />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
