
import React from "react";
import CreateAdminUser from "@/components/CreateAdminUser";

const CreateAdminPage = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">System Administration</h1>
        <p className="text-muted-foreground">
          Create administrator accounts for system management
        </p>
      </div>
      
      <CreateAdminUser />
    </div>
  );
};

export default CreateAdminPage;
