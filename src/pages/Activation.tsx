
import React from "react";
import LicenseActivation from "@/components/LicenseActivation";

const Activation = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Account Activation</h1>
        <p className="text-muted-foreground">
          Activate your license key to unlock premium features
        </p>
      </div>
      
      <LicenseActivation />
    </div>
  );
};

export default Activation;
