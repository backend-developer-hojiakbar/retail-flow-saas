
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Store, SubscriptionTier } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Search, Plus, Info, Clock, Ban, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample stores data
const sampleStores: Store[] = [
  {
    id: "1",
    name: "Gadget Galaxy",
    subscription: "gold",
    validUntil: new Date(2025, 8, 15),
    owner: "Alisher Karimov",
    status: "active",
  },
  {
    id: "2",
    name: "Digital World",
    subscription: "platinum",
    validUntil: new Date(2025, 9, 25),
    owner: "Umid Rahimov",
    status: "active",
  },
  {
    id: "3",
    name: "Mobile City",
    subscription: "silver",
    validUntil: new Date(2025, 5, 10),
    owner: "Nilufar Umarova",
    status: "active",
  },
  {
    id: "4",
    name: "iCenter",
    subscription: "gold",
    validUntil: new Date(2025, 7, 20),
    owner: "Bobur Kamolov",
    status: "active",
  },
  {
    id: "5",
    name: "Phone Master",
    subscription: "free",
    validUntil: new Date(2025, 4, 5),
    owner: "Dilshod Nazarov",
    status: "expired",
  },
  {
    id: "6",
    name: "Techno Shop",
    subscription: "silver",
    validUntil: new Date(2025, 6, 30),
    owner: "Aziza Saidova",
    status: "blocked",
  },
];

export default function Stores() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [stores, setStores] = useState<Store[]>(sampleStores);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [newStore, setNewStore] = useState({
    name: "",
    ownerName: "",
    ownerPhone: "",
    ownerUsername: "",
    ownerPassword: "",
    subscription: "free" as SubscriptionTier,
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleAddStoreChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStore((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubscriptionChange = (value: string) => {
    setNewStore((prev) => ({
      ...prev,
      subscription: value as SubscriptionTier,
    }));
  };

  const handleAddStore = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validUntil = new Date();
    validUntil.setMonth(validUntil.getMonth() + 1); // Free trial for 1 month

    const newStoreData: Store = {
      id: String(stores.length + 1),
      name: newStore.name,
      subscription: newStore.subscription,
      validUntil,
      owner: newStore.ownerName,
      status: "active",
    };

    setStores((prev) => [...prev, newStoreData]);
    setIsAddDialogOpen(false);
    setNewStore({
      name: "",
      ownerName: "",
      ownerPhone: "",
      ownerUsername: "",
      ownerPassword: "",
      subscription: "free",
    });
    toast.success(`Store "${newStore.name}" created successfully`);
  };

  const handleViewStore = (store: Store) => {
    setSelectedStore(store);
    setIsViewDialogOpen(true);
  };

  const handleBlock = (store: Store) => {
    setStores((prev) =>
      prev.map((s) =>
        s.id === store.id ? { ...s, status: "blocked" } : s
      )
    );
    toast.success(`Store "${store.name}" has been blocked`);
  };

  const handleUnblock = (store: Store) => {
    setStores((prev) =>
      prev.map((s) =>
        s.id === store.id ? { ...s, status: "active" } : s
      )
    );
    toast.success(`Store "${store.name}" has been unblocked`);
  };

  const handleExtend = (store: Store) => {
    const validUntil = new Date(store.validUntil);
    validUntil.setMonth(validUntil.getMonth() + 1); // Extend by 1 month
    
    setStores((prev) =>
      prev.map((s) =>
        s.id === store.id
          ? { ...s, validUntil, status: "active" }
          : s
      )
    );
    toast.success(`Subscription for "${store.name}" extended by 1 month`);
  };

  const getStatusBadge = (status: "active" | "expired" | "blocked") => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            {t("active")}
          </Badge>
        );
      case "expired":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            <Clock className="mr-1 h-3 w-3" />
            {t("expired")}
          </Badge>
        );
      case "blocked":
        return (
          <Badge variant="destructive">
            <Ban className="mr-1 h-3 w-3" />
            {t("blocked")}
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

  const filteredStores = stores.filter(
    (store) =>
      store.name.toLowerCase().includes(search.toLowerCase()) ||
      store.owner.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">{t("stores")}</h1>
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

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="pos-button">
              <Plus className="h-4 w-4 mr-2" />
              {t("createStore")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleAddStore}>
              <DialogHeader>
                <DialogTitle>{t("createStore")}</DialogTitle>
                <DialogDescription>
                  Add a new store to the system. This will create a store owner
                  account.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    {t("storeName")}
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newStore.name}
                    onChange={handleAddStoreChange}
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ownerName" className="text-right">
                    {t("ownerName")}
                  </Label>
                  <Input
                    id="ownerName"
                    name="ownerName"
                    value={newStore.ownerName}
                    onChange={handleAddStoreChange}
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ownerPhone" className="text-right">
                    {t("ownerPhone")}
                  </Label>
                  <Input
                    id="ownerPhone"
                    name="ownerPhone"
                    value={newStore.ownerPhone}
                    onChange={handleAddStoreChange}
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ownerUsername" className="text-right">
                    {t("username")}
                  </Label>
                  <Input
                    id="ownerUsername"
                    name="ownerUsername"
                    value={newStore.ownerUsername}
                    onChange={handleAddStoreChange}
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="ownerPassword" className="text-right">
                    {t("password")}
                  </Label>
                  <Input
                    id="ownerPassword"
                    name="ownerPassword"
                    type="password"
                    value={newStore.ownerPassword}
                    onChange={handleAddStoreChange}
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subscription" className="text-right">
                    {t("subscriptionType")}
                  </Label>
                  <Select
                    value={newStore.subscription}
                    onValueChange={handleSubscriptionChange}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select subscription" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">Free</SelectItem>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                      <SelectItem value="vip">V.I.P</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" className="pos-button">
                  {t("create")}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>{filteredStores.length} {t("stores")}</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>{t("storeName")}</TableHead>
                <TableHead>{t("storeOwner")}</TableHead>
                <TableHead>{t("subscriptionType")}</TableHead>
                <TableHead>{t("validUntil")}</TableHead>
                <TableHead>{t("status")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell>{store.id}</TableCell>
                  <TableCell className="font-medium">{store.name}</TableCell>
                  <TableCell>{store.owner}</TableCell>
                  <TableCell>
                    {getSubscriptionBadge(store.subscription)}
                  </TableCell>
                  <TableCell>
                    {format(store.validUntil, "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>{getStatusBadge(store.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewStore(store)}
                      >
                        <Info className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      {store.status === "blocked" ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUnblock(store)}
                          className="text-green-500 border-green-500 hover:text-green-600 hover:border-green-600"
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          {t("unblock")}
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleBlock(store)}
                          className="text-red-500 border-red-500 hover:text-red-600 hover:border-red-600"
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          {t("block")}
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleExtend(store)}
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        {t("extend")}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {filteredStores.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No stores found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Store Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Store Details</DialogTitle>
          </DialogHeader>

          {selectedStore && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Store ID:</div>
                <div>{selectedStore.id}</div>

                <div className="text-muted-foreground">Store Name:</div>
                <div>{selectedStore.name}</div>

                <div className="text-muted-foreground">Owner:</div>
                <div>{selectedStore.owner}</div>

                <div className="text-muted-foreground">Subscription:</div>
                <div>{getSubscriptionBadge(selectedStore.subscription)}</div>

                <div className="text-muted-foreground">Valid Until:</div>
                <div>{format(selectedStore.validUntil, "yyyy-MM-dd")}</div>

                <div className="text-muted-foreground">Status:</div>
                <div>{getStatusBadge(selectedStore.status)}</div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Subscription Features:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {selectedStore.subscription === "free" && (
                    <>
                      <li>100 products limit</li>
                      <li>1 branch only</li>
                      <li>Basic features</li>
                    </>
                  )}
                  {selectedStore.subscription === "silver" && (
                    <>
                      <li>500 products limit</li>
                      <li>Up to 2 branches</li>
                      <li>Basic reporting</li>
                      <li>Installment payments</li>
                    </>
                  )}
                  {selectedStore.subscription === "gold" && (
                    <>
                      <li>2000 products limit</li>
                      <li>Up to 5 branches</li>
                      <li>Advanced reporting</li>
                      <li>Multi-currency support</li>
                      <li>SMS notifications</li>
                    </>
                  )}
                  {selectedStore.subscription === "platinum" && (
                    <>
                      <li>10,000 products limit</li>
                      <li>Up to 10 branches</li>
                      <li>Premium support</li>
                      <li>All available features</li>
                    </>
                  )}
                  {selectedStore.subscription === "vip" && (
                    <>
                      <li>Unlimited products</li>
                      <li>Unlimited branches</li>
                      <li>24/7 support</li>
                      <li>Custom feature development</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
