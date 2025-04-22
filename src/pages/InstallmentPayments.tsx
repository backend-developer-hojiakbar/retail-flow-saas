
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Search, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function InstallmentPayments() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  const installments = [
    {
      id: "1",
      customer: "John Doe",
      totalAmount: 5000000,
      remainingAmount: 3000000,
      nextPaymentDate: new Date(2024, 4, 15),
      status: "active",
    },
    // Add more sample data as needed
  ];

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: "bg-green-500",
      completed: "bg-blue-500",
      overdue: "bg-red-500",
    };

    return (
      <Badge className={statusColors[status as keyof typeof statusColors]}>
        {t(status)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold gradient-heading">{t("installments")}</h1>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {t("add")} {t("installment")}
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative md:w-96">
          <Input
            placeholder={t("search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>{t("installments")} {t("list")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("customer")}</TableHead>
                <TableHead>{t("totalAmount")}</TableHead>
                <TableHead>{t("remainingAmount")}</TableHead>
                <TableHead>{t("nextPayment")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {installments.map((installment) => (
                <TableRow key={installment.id}>
                  <TableCell>{installment.customer}</TableCell>
                  <TableCell>{installment.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>{installment.remainingAmount.toLocaleString()}</TableCell>
                  <TableCell>{format(installment.nextPaymentDate, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{getStatusBadge(installment.status)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      {t("view")}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
