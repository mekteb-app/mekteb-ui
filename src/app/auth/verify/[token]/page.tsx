import React from "react";
import { Metadata } from "next";
import PublicLayout from "@/components/Layouts/PublicLayout";
import VerifyAccountForm from "@/components/Auth/VerifyAccountForm";

export const metadata: Metadata = {
  title: "Mekteb app - Verify account",
};

const VerifyAccount: React.FC = () => {
  return (
    <PublicLayout>
      <VerifyAccountForm />
    </PublicLayout>
  );
};

export default VerifyAccount;
