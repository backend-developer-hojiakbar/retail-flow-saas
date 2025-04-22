import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Product, PaymentMethod } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Search, Plus, Minus, X, CreditCard, Tag } from "lucide-react";

// Sample products data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 13 Pro Max",
    barcode: "123456789012",
    category: "Phones",
    price: {
      uzs: 12000000,
      usd: 1000,
    },
    register: "1",
    stock: 10,
    minStock: 5,
    storeId: "1",
    branchId: "1",
  },
  {
    id: "2",
    name: "Samsung Galaxy S22",
    barcode: "123456789013",
    category: "Phones",
    price: {
      uzs: 10000000,
      usd: 800,
    },
    register: "1",
    stock: 8,
    minStock: 5,
    storeId: "1",
    branchId: "1",
  },
  {
    id: "3",
    name: "AirPods Pro",
    barcode: "123456789014",
    category: "Accessories",
    price: {
      uzs: 2500000,
      usd: 200,
    },
    register: "1",
    stock: 15,
    minStock: 10,
    storeId: "1",
    branchId: "1",
  },
];

interface CartItem {
  product: Product;
  quantity: number;
}

export default function POS() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [barcodeInput, setBarcodeInput] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = sampleProducts.find((p) => p.barcode === barcodeInput);
    if (product) {
      addToCart(product);
      setBarcodeInput("");
    } else {
      toast.error("Product not found");
    }
  };

  const addToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          toast.error("Not enough stock");
          return prev;
        }
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const newQuantity = Math.max(1, Math.min(quantity, item.product.stock));
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    toast.success("Payment processed successfully!");
    setCartItems([]);
  };

  const filteredProducts = sampleProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.barcode?.includes(search)
  );

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price.uzs * item.quantity,
    0
  );

  return (
    <div className="h-full flex flex-col lg:flex-row gap-6 animate-fade-in">
      {/* Product selection section */}
      <div className="flex-1 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <form onSubmit={handleBarcodeSubmit} className="flex-1">
            <div className="relative">
              <Input
                placeholder={t("scanBarcode")}
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                className="pl-10"
              />
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </form>
          <div className="relative flex-1">
            <Input
              placeholder={t("search")}
              value={search}
              onChange={handleSearch}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden card-gradient">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-sm">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {product.stock} {t("available")}
                  </span>
                  <span className="font-semibold">
                    {new Intl.NumberFormat().format(product.price.uzs)} UZS
                  </span>
                </div>
              </CardContent>
              <CardFooter className="p-2 bg-muted/30">
                <Button
                  onClick={() => addToCart(product)}
                  className="w-full pos-button text-xs"
                  disabled={product.stock === 0}
                >
                  {t("addToCart")}
                </Button>
              </CardFooter>
            </Card>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">{t("noProductsFound")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Cart section */}
      <div className="lg:w-1/3 space-y-4">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>{t("cart")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-muted-foreground">{t("cartEmpty")}</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between border-b border-border pb-2"
                >
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Intl.NumberFormat().format(item.product.price.uzs)} UZS
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-muted-foreground hover:text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <div className="flex justify-between w-full text-lg font-bold">
              <span>{t("total")}:</span>
              <span>{new Intl.NumberFormat().format(total)} UZS</span>
            </div>

            <Tabs
              defaultValue="cash"
              onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="cash">{t("cash")}</TabsTrigger>
                <TabsTrigger value="card">{t("card")}</TabsTrigger>
                <TabsTrigger value="mixed">{t("mixed")}</TabsTrigger>
                <TabsTrigger value="credit">{t("credit")}</TabsTrigger>
                <TabsTrigger value="installment">{t("installment")}</TabsTrigger>
              </TabsList>
              <TabsContent value="cash" className="mt-4">
                <Button
                  onClick={handleCheckout}
                  className="w-full pos-button"
                  disabled={cartItems.length === 0}
                >
                  {t("checkout")}
                </Button>
              </TabsContent>
              <TabsContent value="card" className="mt-4 space-y-4">
                <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/30">
                  <CreditCard className="text-muted-foreground" />
                  <span>Credit Card Payment</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full pos-button"
                  disabled={cartItems.length === 0}
                >
                  {t("checkout")}
                </Button>
              </TabsContent>
              {/* Other payment methods would have their own content */}
              <TabsContent value="mixed" className="mt-4">
                <Button
                  onClick={handleCheckout}
                  className="w-full pos-button"
                  disabled={cartItems.length === 0}
                >
                  {t("checkout")}
                </Button>
              </TabsContent>
              <TabsContent value="credit" className="mt-4">
                <Button
                  onClick={handleCheckout}
                  className="w-full pos-button"
                  disabled={cartItems.length === 0}
                >
                  {t("checkout")}
                </Button>
              </TabsContent>
              <TabsContent value="installment" className="mt-4">
                <Button
                  onClick={handleCheckout}
                  className="w-full pos-button"
                  disabled={cartItems.length === 0}
                >
                  {t("checkout")}
                </Button>
              </TabsContent>
            </Tabs>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
