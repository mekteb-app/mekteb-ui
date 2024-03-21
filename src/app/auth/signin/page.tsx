import React from "react";
import { Metadata } from "next";
import PublicLayout from "@/components/Layouts/PublicLayout";
import LoginForm from "@/components/Auth/LoginForm";

export const metadata: Metadata = {
  title: "Mekteb app - Signin",
};

const SignIn: React.FC = () => {
  return (
    <PublicLayout>
      <LoginForm />
    </PublicLayout>
  );
};

export default SignIn;
