
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UsersTable from "@/components/admin/UsersTable";
import UserEditDialog from "@/components/admin/UserEditDialog";
import { UserWithRole, useUserManagement } from "@/hooks/useUserManagement";

const UserManagementPanel: React.FC = () => {
  const {
    users,
    isLoading,
    loadingUserAction,
    updateUser,
    toggleAdminRole,
    deleteUser
  } = useUserManagement();
  
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditUser = (user: UserWithRole) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleUpdateUser = async (values: { username: string; full_name: string }) => {
    if (!selectedUser) return;
    
    const success = await updateUser(selectedUser.id, values);
    if (success) {
      setIsEditDialogOpen(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <UsersTable
          users={users}
          isLoading={isLoading}
          loadingUserAction={loadingUserAction}
          onEditUser={handleEditUser}
          onToggleAdmin={toggleAdminRole}
          onDeleteUser={deleteUser}
        />
      </CardContent>

      {selectedUser && (
        <UserEditDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          user={selectedUser}
          isLoading={loadingUserAction !== null && loadingUserAction.id === selectedUser.id}
          onSubmit={handleUpdateUser}
        />
      )}
    </Card>
  );
};

export default UserManagementPanel;
