
import { User, UserRole } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
  newUser: {
    name: string;
    username: string;
    password: string;
    role: UserRole;
    phone: string;
    storeId: string;
    email: string;
    telegramUsername: string;
  };
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export function AddUserDialog({ 
  open, 
  onOpenChange, 
  onSubmit, 
  newUser, 
  onInputChange 
}: AddUserDialogProps) {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <form onSubmit={onSubmit}>
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
                onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
  );
}
