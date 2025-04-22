
import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { User, UserRole } from "@/types";
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
import { Search, Plus, Edit, Trash2, UserCheck } from "lucide-react";
import { toast } from "sonner";
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

// Sample users data
const sampleUsers: User[] = [
  {
    id: "super1",
    name: "Superadmin",
    username: "superadmin",
    role: "superuser",
    phone: "+998 99 999 9999",
  },
  {
    id: "1",
    name: "Demo Admin",
    username: "demo",
    role: "admin",
    storeId: "1",
    phone: "+998 90 123 4567",
  },
  {
    id: "2",
    name: "Alisher Karimov",
    username: "alisher",
    role: "admin",
    storeId: "2",
    phone: "+998 90 234 5678",
  },
  {
    id: "3",
    name: "Umid Rahimov",
    username: "umid",
    role: "admin",
    storeId: "3",
    phone: "+998 90 345 6789",
  },
  {
    id: "4",
    name: "Nilufar Umarova",
    username: "nilufar",
    role: "cashier",
    storeId: "1",
    phone: "+998 90 456 7890",
  },
  {
    id: "5",
    name: "Bobur Kamolov",
    username: "bobur",
    role: "inventory",
    storeId: "2",
    phone: "+998 90 567 8901",
  },
];

// Store names for reference
const storeNames: Record<string, string> = {
  "1": "Gadget Galaxy",
  "2": "Digital World",
  "3": "Mobile City",
  "4": "iCenter",
  "5": "Phone Master",
};

export default function Users() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>(sampleUsers);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
    role: "admin" as UserRole,
    phone: "",
    storeId: "1",
    email: "",
    telegramUsername: "",
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newUserData: User = {
      id: String(users.length + 1),
      name: newUser.name,
      username: newUser.username,
      role: newUser.role,
      storeId: newUser.role === "superuser" ? undefined : newUser.storeId,
      phone: newUser.phone,
      email: newUser.email || undefined,
      telegramUsername: newUser.telegramUsername || undefined,
    };

    setUsers((prev) => [...prev, newUserData]);
    setIsAddDialogOpen(false);
    setNewUser({
      name: "",
      username: "",
      password: "",
      role: "admin",
      phone: "",
      storeId: "1",
      email: "",
      telegramUsername: "",
    });
    
    toast.success(`User "${newUser.name}" created successfully`);
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find((user) => user.id === userId);
    
    if (userToDelete && userToDelete.role === "superuser") {
      toast.error("Superadmin users cannot be deleted");
      return;
    }
    
    setUsers((prev) => prev.filter((user) => user.id !== userId));
    toast.success("User deleted successfully");
  };

  const getRoleBadge = (role: UserRole) => {
    const variants: Record<UserRole, { color: string; icon: JSX.Element }> = {
      superuser: { 
        color: "bg-purple-600 hover:bg-purple-700", 
        icon: <UserCheck className="mr-1 h-3 w-3" />
      },
      admin: { 
        color: "bg-blue-500 hover:bg-blue-600", 
        icon: <UserCheck className="mr-1 h-3 w-3" />
      },
      cashier: { 
        color: "bg-green-500 hover:bg-green-600", 
        icon: <UserCheck className="mr-1 h-3 w-3" />
      },
      inventory: { 
        color: "bg-amber-500 hover:bg-amber-600", 
        icon: <UserCheck className="mr-1 h-3 w-3" />
      },
    };

    return (
      <Badge className={variants[role].color}>
        {variants[role].icon}
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      (user.storeId && storeNames[user.storeId]?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">Users</h1>
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
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleAddUser}>
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Add a new user to the system
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newUser.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    value={newUser.username}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={newUser.password}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">
                    Role
                  </Label>
                  <select
                    id="role"
                    name="role"
                    value={newUser.role}
                    onChange={handleInputChange}
                    className="col-span-3 rounded-md border border-input bg-background px-3 py-2"
                    required
                  >
                    <option value="superuser">Superuser</option>
                    <option value="admin">Admin</option>
                    <option value="cashier">Cashier</option>
                    <option value="inventory">Inventory</option>
                  </select>
                </div>

                {newUser.role !== "superuser" && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="storeId" className="text-right">
                      Store
                    </Label>
                    <select
                      id="storeId"
                      name="storeId"
                      value={newUser.storeId}
                      onChange={handleInputChange}
                      className="col-span-3 rounded-md border border-input bg-background px-3 py-2"
                      required
                    >
                      <option value="1">Gadget Galaxy</option>
                      <option value="2">Digital World</option>
                      <option value="3">Mobile City</option>
                      <option value="4">iCenter</option>
                      <option value="5">Phone Master</option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={newUser.phone}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="telegramUsername" className="text-right">
                    Telegram
                  </Label>
                  <Input
                    id="telegramUsername"
                    name="telegramUsername"
                    value={newUser.telegramUsername}
                    onChange={handleInputChange}
                    placeholder="@username"
                    className="col-span-3"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" className="pos-button">
                  Create User
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>{filteredUsers.length} Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    {user.storeId ? storeNames[user.storeId] : "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span>{user.phone}</span>
                      {user.email && (
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
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
                        onClick={() => handleDeleteUser(user.id)}
                        disabled={user.role === "superuser"}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-muted-foreground"
                  >
                    No users found
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
