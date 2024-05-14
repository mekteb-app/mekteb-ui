import { Metadata } from "next";
import ProtectedRoute from "@/components/RouteProtection";
import Communities from "@/components/Communities";

export const metadata: Metadata = {
  title: "Mekteb app - Communities",
};

const CommunitiesPage = () => {
  return (
    <ProtectedRoute>
      <Communities />
    </ProtectedRoute>
  );
};

export default CommunitiesPage;
