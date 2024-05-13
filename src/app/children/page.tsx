import { Metadata } from "next";
import ProtectedRoute from "@/components/RouteProtection";
import Children from "@/components/Children";

export const metadata: Metadata = {
  title: "Mekteb app - Children",
};

const ChildrenPage = () => {
  return (
    <ProtectedRoute>
      <Children />
    </ProtectedRoute>
  );
};

export default ChildrenPage;
