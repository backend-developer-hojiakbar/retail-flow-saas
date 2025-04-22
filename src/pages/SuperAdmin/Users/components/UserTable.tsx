
import { User, UserRole } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, UserCheck } from "lucide-react";
import { toast } from "sonner";

interface UserTableProps {
  users: User[];
  storeNames: Record<string, string>;
  onDeleteUser: (userId: string) => void;
}

export function UserTable({ users, storeNames, onDeleteUser }: UserTableProps) {
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

  if (users.length === 0) {
    return (
      <TableRow>
        <TableCell
          colSpan={7}
          className="text-center py-10 text-muted-foreground"
        >
          No users found
        </TableCell>
      </TableRow>
    );
  }

  return (
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
        {users.map((user) => (
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
                  onClick={() => onDeleteUser(user.id)}
                  disabled={user.role === "superuser"}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
