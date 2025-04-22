
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { SubscriptionPayment, SubscriptionTier } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  ImageIcon, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Filter 
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample payment data
const samplePayments: SubscriptionPayment[] = [
  {
    id: "1",
    storeId: "1",
    amount: 399000,
    date: new Date(2025, 3, 18),
    status: "pending",
    subscriptionTier: "gold",
    months: 1,
    receiptImage: "https://via.placeholder.com/300x400",
  },
  {
    id: "2",
    storeId: "2",
    amount: 799000,
    date: new Date(2025, 3, 15),
    status: "approved",
    subscriptionTier: "platinum",
    months: 1,
    approvedBy: "admin",
    approvedDate: new Date(2025, 3, 16),
    receiptImage: "https://via.placeholder.com/300x400",
  },
  {
    id: "3",
    storeId: "3",
    amount: 199000,
    date: new Date(2025, 3, 12),
    status: "approved",
    subscriptionTier: "silver",
    months: 1,
    approvedBy: "admin",
    approvedDate: new Date(2025, 3, 12),
    receiptImage: "https://via.placeholder.com/300x400",
  },
  {
    id: "4",
    storeId: "4",
    amount: 399000,
    date: new Date(2025, 3, 10),
    status: "rejected",
    subscriptionTier: "gold",
    months: 1,
    receiptImage: "https://via.placeholder.com/300x400",
  },
  {
    id: "5",
    storeId: "5",
    amount: 199000,
    date: new Date(2025, 3, 5),
    status: "pending",
    subscriptionTier: "silver",
    months: 1,
    receiptImage: "https://via.placeholder.com/300x400",
  },
];

const storeNames: Record<string, string> = {
  "1": "Gadget Galaxy",
  "2": "Digital World",
  "3": "Mobile City",
  "4": "iCenter",
  "5": "Phone Master",
};

export default function Payments() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [payments, setPayments] = useState<SubscriptionPayment[]>(samplePayments);
  const [selectedPayment, setSelectedPayment] = useState<SubscriptionPayment | null>(null);
  const [isReceiptDialogOpen, setIsReceiptDialogOpen] = useState(false);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleViewReceipt = (payment: SubscriptionPayment) => {
    setSelectedPayment(payment);
    setIsReceiptDialogOpen(true);
  };

  const handleApprovePayment = (payment: SubscriptionPayment) => {
    setSelectedPayment(payment);
    setIsApproveDialogOpen(true);
  };

  const handleRejectPayment = (payment: SubscriptionPayment) => {
    setSelectedPayment(payment);
    setIsRejectDialogOpen(true);
  };

  const confirmApprove = () => {
    if (!selectedPayment) return;

    setPayments((prev) =>
      prev.map((p) =>
        p.id === selectedPayment.id
          ? {
              ...p,
              status: "approved",
              approvedBy: "admin",
              approvedDate: new Date(),
            }
          : p
      )
    );

    toast.success(`Payment from ${storeNames[selectedPayment.storeId]} has been approved`);
    setIsApproveDialogOpen(false);
  };

  const confirmReject = () => {
    if (!selectedPayment) return;

    setPayments((prev) =>
      prev.map((p) =>
        p.id === selectedPayment.id
          ? {
              ...p,
              status: "rejected",
            }
          : p
      )
    );

    toast.success(`Payment from ${storeNames[selectedPayment.storeId]} has been rejected`);
    setIsRejectDialogOpen(false);
  };

  const getStatusBadge = (status: "pending" | "approved" | "rejected") => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            <AlertCircle className="mr-1 h-3 w-3" />
            {t("pending")}
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle className="mr-1 h-3 w-3" />
            {t("approved")}
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            {t("rejected")}
          </Badge>
        );
    }
  };

  const getSubscriptionBadge = (tier: SubscriptionTier) => {
    const colors: Record<SubscriptionTier, string> = {
      free: "bg-gray-500 hover:bg-gray-600",
      silver: "bg-slate-400 hover:bg-slate-500",
      gold: "bg-amber-500 hover:bg-amber-600",
      platinum: "bg-slate-700 hover:bg-slate-800",
      vip: "bg-violet-600 hover:bg-violet-700",
    };

    return <Badge className={colors[tier]}>{tier.toUpperCase()}</Badge>;
  };

  const filteredPayments = payments.filter((payment) => {
    // Apply search filter
    const searchMatch =
      search === "" ||
      storeNames[payment.storeId].toLowerCase().includes(search.toLowerCase()) ||
      payment.id.toLowerCase().includes(search.toLowerCase());

    // Apply status filter
    const statusMatch = statusFilter === "" || payment.status === statusFilter;

    return searchMatch && statusMatch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">{t("payments")}</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative md:w-96">
          <Input
            placeholder={t("search")}
            value={search}
            onChange={handleSearch}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>

        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="pending">{t("pending")}</SelectItem>
              <SelectItem value="approved">{t("approved")}</SelectItem>
              <SelectItem value="rejected">{t("rejected")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>{filteredPayments.length} {t("payments")}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>{t("amount")}</TableHead>
                <TableHead>{t("paymentDate")}</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.id}</TableCell>
                  <TableCell className="font-medium">
                    {storeNames[payment.storeId]}
                  </TableCell>
                  <TableCell>
                    {getSubscriptionBadge(payment.subscriptionTier)}
                  </TableCell>
                  <TableCell>
                    {new Intl.NumberFormat().format(payment.amount)} {t("uzs")}
                  </TableCell>
                  <TableCell>{format(payment.date, "yyyy-MM-dd")}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewReceipt(payment)}
                        className="flex items-center"
                      >
                        <ImageIcon className="h-4 w-4 mr-1" />
                        {t("viewImage")}
                      </Button>

                      {payment.status === "pending" && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprovePayment(payment)}
                            className="text-green-500 border-green-500 hover:text-green-600 hover:border-green-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            {t("approve")}
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectPayment(payment)}
                            className="text-red-500 border-red-500 hover:text-red-600 hover:border-red-600"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            {t("reject")}
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {filteredPayments.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No payments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Receipt Image Dialog */}
      <Dialog open={isReceiptDialogOpen} onOpenChange={setIsReceiptDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
            <DialogDescription>
              {selectedPayment &&
                `Receipt from ${storeNames[selectedPayment.storeId]} for ${
                  selectedPayment.subscriptionTier
                } plan`}
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center">
            {selectedPayment && (
              <img
                src={selectedPayment.receiptImage}
                alt="Payment Receipt"
                className="rounded-md max-h-96 object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Approve Payment Dialog */}
      <Dialog
        open={isApproveDialogOpen}
        onOpenChange={setIsApproveDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Payment</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this payment? This will extend the
              store's subscription.
            </DialogDescription>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Store:</div>
                <div>{storeNames[selectedPayment.storeId]}</div>

                <div className="text-muted-foreground">Plan:</div>
                <div>
                  {getSubscriptionBadge(selectedPayment.subscriptionTier)}
                </div>

                <div className="text-muted-foreground">Amount:</div>
                <div>
                  {new Intl.NumberFormat().format(selectedPayment.amount)}{" "}
                  {t("uzs")}
                </div>

                <div className="text-muted-foreground">Payment Date:</div>
                <div>{format(selectedPayment.date, "yyyy-MM-dd")}</div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>
              {t("cancel")}
            </Button>
            <Button onClick={confirmApprove} className="pos-button">
              {t("approve")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Payment Dialog */}
      <Dialog
        open={isRejectDialogOpen}
        onOpenChange={setIsRejectDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Payment</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this payment? The store will need
              to submit a new payment.
            </DialogDescription>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Store:</div>
                <div>{storeNames[selectedPayment.storeId]}</div>

                <div className="text-muted-foreground">Plan:</div>
                <div>
                  {getSubscriptionBadge(selectedPayment.subscriptionTier)}
                </div>

                <div className="text-muted-foreground">Amount:</div>
                <div>
                  {new Intl.NumberFormat().format(selectedPayment.amount)}{" "}
                  {t("uzs")}
                </div>

                <div className="text-muted-foreground">Payment Date:</div>
                <div>{format(selectedPayment.date, "yyyy-MM-dd")}</div>
              </div>
              
              <Input 
                placeholder="Reason for rejection (optional)" 
                className="w-full"
              />
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectDialogOpen(false)}
            >
              {t("cancel")}
            </Button>
            <Button variant="destructive" onClick={confirmReject}>
              {t("reject")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
