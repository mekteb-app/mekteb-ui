import React from "react";
import { Metadata } from "next";
import PublicLayout from "@/components/Layouts/PublicLayout";
import ResetPasswordForm from "@/components/Auth/ResetPassword";

export const metadata: Metadata = {
  title: "Mekteb app - Reset password",
};

const ResetPassword: React.FC = () => {
  return (
    <PublicLayout>
      <ResetPasswordForm />
    </PublicLayout>
  );
};

export default ResetPassword;
