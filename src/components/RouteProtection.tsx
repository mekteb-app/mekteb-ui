"use client";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "./lib/JWTSessionProvider";
import Loader from "./common/Loader";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const session = useSession();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const { accessToken } = session;
    // Check if the user is authenticated, redirect to login if not.
    if (!accessToken) {
      router.push("/auth/signin"); // Redirect to the login page.
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return <>{loading ? <Loader /> : children}</>;
};

export default ProtectedRoute;
