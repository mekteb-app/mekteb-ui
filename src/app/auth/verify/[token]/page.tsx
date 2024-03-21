"use client";
import React from "react";
import { useParams } from "next/navigation"; // Import useRouter from next/navigation
import PublicLayout from "@/components/Layouts/PublicLayout";
import VerifyAccountForm from "@/components/Auth/VerifyAccountForm";

const VerifyAccount: React.FC = () => {
  const router = useParams();
  const { token } = router;

  return (
    <PublicLayout>
      <VerifyAccountForm />
    </PublicLayout>
  );
};

export default VerifyAccount;
