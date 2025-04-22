
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  {
    id: "4",
    name: "USB-C Charging Cable",
    barcode: "123456789015",
    category: "Accessories",
    price: {
      uzs: 150000,
      usd: 12,
    },
    register: "1",
    stock: 30,
    minStock: 15,
    storeId: "1",
    branchId: "1",
  },
  {
    id: "5",
    name: "Phone Case Clear",
    barcode: "123456789016",
    category: "Accessories",
    price: {
      uzs: 100000,
      usd: 8,
    },
    register: "1",
    stock: 25,
    minStock: 10,
    storeId: "1",
    branchId: "1",
  },
];

export default function Products() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"table" | "grid">("table");
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    barcode: "",
    category: "Accessories",
    price: {
      uzs: 0,
      usd: 0,
    },
    register: "1",
    stock: 0,
    minStock: 1,
    storeId: "1",
    branchId: "1",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "priceUzs") {
      setNewProduct(prev => ({
        ...prev,
        price: {
          ...prev.price,
          uzs: Number(value),
          usd: Number(value) / 12500, // Approximate conversion
        }
      }));
    } else if (name === "priceUsd") {
      setNewProduct(prev => ({
        ...prev,
        price: {
          ...prev.price,
          usd: Number(value),
          uzs: Number(value) * 12500, // Approximate conversion
        }
      }));
    } else {
      setNewProduct(prev => ({
        ...prev,
        [name]: name === "stock" || name === "minStock" ? Number(value) : value
      }));
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const id = String(products.length + 1);
    const product = {
      ...newProduct,
      id,
    } as Product;

    setProducts(prev => [...prev, product]);
    setNewProduct({
      name: "",
      barcode: "",
      category: "Accessories",
      price: {
        uzs: 0,
        usd: 0,
      },
      register: "1",
      stock: 0,
      minStock: 1,
      storeId: "1",
      branchId: "1",
    });
    setIsDialogOpen(false);
    toast.success("Product added successfully");
  };

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    toast.success("Product deleted successfully");
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.barcode?.includes(search) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">{t("products")}</h1>
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
          <Tabs 
            defaultValue="table" 
            value={view}
            onValueChange={(value) => setView(value as "table" | "grid")}
          >
            <TabsList>
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="grid">Grid</TabsTrigger>
            </TabsList>
          </Tabs>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="pos-button">
                <Plus className="h-4 w-4 mr-2" />
                {t("product")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>{t("create")}</DialogTitle>
                <DialogDescription>
                  Add a new product to your inventory.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddProduct}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={newProduct.name}
                      onChange={handleChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="barcode" className="text-right">
                      Barcode
                    </Label>
                    <Input
                      id="barcode"
                      name="barcode"
                      value={newProduct.barcode}
                      onChange={handleChange}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <Input
                      id="category"
                      name="category"
                      value={newProduct.category}
                      onChange={handleChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priceUzs" className="text-right">
                      Price (UZS)
                    </Label>
                    <Input
                      id="priceUzs"
                      name="priceUzs"
                      type="number"
                      value={newProduct.price?.uzs || 0}
                      onChange={handleChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock" className="text-right">
                      Stock
                    </Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={newProduct.stock || 0}
                      onChange={handleChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="minStock" className="text-right">
                      Min Stock
                    </Label>
                    <Input
                      id="minStock"
                      name="minStock"
                      type="number"
                      value={newProduct.minStock || 1}
                      onChange={handleChange}
                      className="col-span-3"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="pos-button">
                    {t("save")}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table View */}
      <TabsContent value="table" className="m-0">
        <Card className="card-gradient">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Barcode</TableHead>
                  <TableHead>Price (UZS)</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.barcode || "-"}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat().format(product.price.uzs)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {product.stock}
                        {product.stock <= product.minStock && (
                          <Badge variant="destructive" className="ml-2">
                            Low
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      <p className="text-muted-foreground">
                        No products found
                      </p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Grid View */}
      <TabsContent value="grid" className="m-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden card-gradient">
              <CardHeader className="p-4 pb-0">
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <CardDescription>{product.category}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Barcode</span>
                    <span>{product.barcode || "-"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Price</span>
                    <span>{new Intl.NumberFormat().format(product.price.uzs)} UZS</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Stock</span>
                    <div className="flex items-center">
                      {product.stock}
                      {product.stock <= product.minStock && (
                        <Badge variant="destructive" className="ml-2">
                          Low
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-2 bg-muted/30 flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No products found</p>
            </div>
          )}
        </div>
      </TabsContent>
    </div>
  );
}
