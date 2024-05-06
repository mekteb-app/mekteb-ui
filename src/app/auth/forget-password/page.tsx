import React from "react";
import { Metadata } from "next";
import PublicLayout from "@/components/Layouts/PublicLayout";
import ForgetPasswordForm from "@/components/Auth/ForgotPassword";

export const metadata: Metadata = {
  title: "Mekteb app - Forget password",
};

const ForgetPassword: React.FC = () => {
  return (
    <PublicLayout>
      <ForgetPasswordForm />
    </PublicLayout>
  );
};

export default ForgetPassword;
