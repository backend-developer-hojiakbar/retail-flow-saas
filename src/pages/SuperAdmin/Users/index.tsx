import { useState } from "react";
import { useTranslation } from "@/context/LanguageContext";
import { User, UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { UserTable } from "./components/UserTable";
import { AddUserDialog } from "./components/AddUserDialog";

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
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
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
          <AddUserDialog
            open={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
            onSubmit={handleAddUser}
            newUser={newUser}
            onInputChange={handleInputChange}
          />
        </Dialog>
      </div>

      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>{filteredUsers.length} Users</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <UserTable 
            users={filteredUsers}
            storeNames={storeNames}
            onDeleteUser={handleDeleteUser}
          />
        </CardContent>
      </Card>
    </div>
  );
}
