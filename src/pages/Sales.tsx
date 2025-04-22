
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Search } from "lucide-react";

export default function Sales() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">{t("sales")}</h1>
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
          <CardTitle>{t("sales")} {t("list")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("date")}</TableHead>
                <TableHead>{t("product")}</TableHead>
                <TableHead>{t("amount")}</TableHead>
                <TableHead>{t("payment_method")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10">
                  <p className="text-muted-foreground">{t("no_data")}</p>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
