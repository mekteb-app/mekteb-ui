import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import Users from "@/components/Users";
import ProtectedRoute from "@/components/RouteProtection";

export const metadata: Metadata = {
  title: "Mekteb app - Users",
};

const UsersPage = () => {
  return (
    <ProtectedRoute>
      <Users />
    </ProtectedRoute>
  );
};

export default UsersPage;
