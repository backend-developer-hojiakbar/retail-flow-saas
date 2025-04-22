
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sale, PaymentMethod } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Search, 
  Calendar,
  Filter,
  FileText,
  Printer,
  Download
} from "lucide-react";
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";

// Sample sales data
const sampleSales: Sale[] = [
  {
    id: "1",
    products: [
      {
        product: {
          id: "1",
          name: "iPhone 13 Pro Max",
          barcode: "123456789012",
          category: "Phones",
          price: { uzs: 12000000, usd: 1000 },
          register: "1",
          stock: 10,
          minStock: 5,
          storeId: "1",
          branchId: "1",
        },
        quantity: 1,
        price: 12000000,
        total: 12000000,
      },
    ],
    total: {
      uzs: 12000000,
      usd: 1000,
    },
    payment: {
      method: "cash",
      cash: {
        amount: 12500000,
        currency: "uzs",
        change: 500000,
      },
    },
    cashierId: "1",
    registerId: "1",
    branchId: "1",
    storeId: "1",
    createdAt: new Date(2025, 3, 18, 14, 35),
    receiptNo: "R-2025041801",
  },
  {
    id: "2",
    products: [
      {
        product: {
          id: "3",
          name: "AirPods Pro",
          barcode: "123456789014",
          category: "Accessories",
          price: { uzs: 2500000, usd: 200 },
          register: "1",
          stock: 15,
          minStock: 10,
          storeId: "1",
          branchId: "1",
        },
        quantity: 2,
        price: 2500000,
        total: 5000000,
      },
      {
        product: {
          id: "4",
          name: "USB-C Charging Cable",
          barcode: "123456789015",
          category: "Accessories",
          price: { uzs: 150000, usd: 12 },
          register: "1",
          stock: 30,
          minStock: 15,
          storeId: "1",
          branchId: "1",
        },
        quantity: 1,
        price: 150000,
        total: 150000,
      },
    ],
    total: {
      uzs: 5150000,
      usd: 412,
    },
    payment: {
      method: "card",
      card: {
        amount: 5150000,
        type: "Uzcard",
      },
    },
    cashierId: "1",
    registerId: "1",
    branchId: "1",
    storeId: "1",
    createdAt: new Date(2025, 3, 19, 10, 22),
    receiptNo: "R-2025041902",
  },
  {
    id: "3",
    products: [
      {
        product: {
          id: "2",
          name: "Samsung Galaxy S22",
          barcode: "123456789013",
          category: "Phones",
          price: { uzs: 10000000, usd: 800 },
          register: "1",
          stock: 8,
          minStock: 5,
          storeId: "1",
          branchId: "1",
        },
        quantity: 1,
        price: 10000000,
        total: 10000000,
      },
      {
        product: {
          id: "5",
          name: "Phone Case Clear",
          barcode: "123456789016",
          category: "Accessories",
          price: { uzs: 100000, usd: 8 },
          register: "1",
          stock: 25,
          minStock: 10,
          storeId: "1",
          branchId: "1",
        },
        quantity: 1,
        price: 100000,
        total: 100000,
      },
    ],
    total: {
      uzs: 10100000,
      usd: 808,
    },
    payment: {
      method: "installment",
      installment: {
        customer: {
          id: "1",
          name: "Anvar Karimov",
          phone: "+998 91 234 5678",
          telegramUsername: "@anvar_k",
          storeId: "1",
        },
        months: 6,
        initialPayment: 2000000,
        monthlyPayment: 1400000,
        interestRate: 5,
      },
    },
    cashierId: "1",
    registerId: "1",
    branchId: "1",
    storeId: "1",
    createdAt: new Date(2025, 3, 20, 16, 45),
    receiptNo: "R-2025042003",
  },
];

export default function Sales() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [filterMethod, setFilterMethod] = useState<string>("");
  const [sales, setSales] = useState<Sale[]>(sampleSales);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const getPaymentMethodBadge = (method: PaymentMethod) => {
    const variants: Record<PaymentMethod, "default" | "outline" | "secondary" | "destructive"> = {
      cash: "default",
      card: "secondary",
      mixed: "outline",
      credit: "destructive",
      installment: "destructive",
    };

    return (
      <Badge variant={variants[method]}>
        {t(method as any)}
      </Badge>
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredSales = sales.filter((sale) => {
    // Apply search filter (by receipt number or products)
    const searchMatch = search === "" || 
      sale.receiptNo.toLowerCase().includes(search.toLowerCase()) || 
      sale.products.some(p => p.product.name.toLowerCase().includes(search.toLowerCase()));
    
    // Apply payment method filter
    const methodMatch = filterMethod === "" || sale.payment.method === filterMethod;
    
    // Apply date range filter
    let dateMatch = true;
    if (dateRange?.from) {
      dateMatch = sale.createdAt >= dateRange.from;
      
      if (dateRange.to) {
        dateMatch = dateMatch && sale.createdAt <= dateRange.to;
      }
    }
    
    return searchMatch && methodMatch && dateMatch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">{t("pos")}</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative md:w-96">
          <Input
            placeholder={t("search")}
            value={search}
            onChange={handleSearch}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="w-full md:w-auto">
            <Select value={filterMethod} onValueChange={setFilterMethod}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Payment Method" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Methods</SelectItem>
                <SelectItem value="cash">{t("cash")}</SelectItem>
                <SelectItem value="card">{t("card")}</SelectItem>
                <SelectItem value="mixed">{t("mixed")}</SelectItem>
                <SelectItem value="credit">{t("credit")}</SelectItem>
                <SelectItem value="installment">{t("installment")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto">
            <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          </div>
        </div>
      </div>
      
      <Card className="card-gradient">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle>{t("sales")} {t("reports")}</CardTitle>
            <CardDescription>
              {filteredSales.length} {filteredSales.length === 1 ? 'sale' : 'sales'} found
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receipt No.</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">
                    {sale.receiptNo}
                  </TableCell>
                  <TableCell>
                    {format(sale.createdAt, "yyyy-MM-dd HH:mm")}
                  </TableCell>
                  <TableCell>
                    {sale.products.length} {sale.products.length > 1 ? "items" : "item"}
                    <div className="text-xs text-muted-foreground mt-1">
                      {sale.products.map(p => p.product.name).join(", ")}
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat().format(sale.total.uzs)} {t("uzs")}
                  </TableCell>
                  <TableCell>
                    {getPaymentMethodBadge(sale.payment.method)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 flex gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <FileText className="h-4 w-4" />
                      <span>View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredSales.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-10">
                    <p className="text-muted-foreground">No sales found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
