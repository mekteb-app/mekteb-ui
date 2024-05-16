import { Metadata } from "next";
import ProtectedRoute from "@/components/RouteProtection";
import Lessons from "@/components/Lessons";

export const metadata: Metadata = {
  title: "Mekteb app - Lessons",
};

const LessonsPage = () => {
  return (
    <ProtectedRoute>
      <Lessons />
    </ProtectedRoute>
  );
};

export default LessonsPage;
