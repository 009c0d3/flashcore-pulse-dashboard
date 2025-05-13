
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Pencil, 
  Shield, 
  ShieldOff, 
  Trash2
} from "lucide-react";
import { UserProfile, UserRole } from "@/types/auth";

interface UserWithRole extends UserProfile {
  email: string;
  isAdmin: boolean;
  user_roles: UserRole[];
}

interface UsersTableProps {
  users: UserWithRole[];
  isLoading: boolean;
  loadingUserAction: {id: string, action: string} | null;
  onEditUser: (user: UserWithRole) => void;
  onToggleAdmin: (userId: string, makeAdmin: boolean) => void;
  onDeleteUser: (userId: string) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ 
  users, 
  isLoading, 
  loadingUserAction,
  onEditUser,
  onToggleAdmin,
  onDeleteUser
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>List of all users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.username || "Not set"}</TableCell>
            <TableCell>{user.full_name || "Not set"}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>
              <div className="flex items-center">
                {user.isAdmin ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
                    Admin
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    User
                  </span>
                )}
              </div>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onEditUser(user)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  {user.isAdmin ? (
                    <DropdownMenuItem 
                      onClick={() => onToggleAdmin(user.id, false)}
                      disabled={loadingUserAction?.id === user.id}
                    >
                      <ShieldOff className="mr-2 h-4 w-4" />
                      Remove Admin Role
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem 
                      onClick={() => onToggleAdmin(user.id, true)}
                      disabled={loadingUserAction?.id === user.id}
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Make Admin
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem 
                    onClick={() => onDeleteUser(user.id)}
                    disabled={loadingUserAction?.id === user.id}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
