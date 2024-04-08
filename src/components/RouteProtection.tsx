"use client";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "./lib/JWTSessionProvider";
import Loader from "./common/Loader";
import { SESSION_TOKEN } from "@/constants";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const session = useSession();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    // TODO Access token should be ONLY from session
    // The way is implemented due to login proces where session is not updated with access token
    const accessToken =
      session.accessToken || localStorage.getItem(SESSION_TOKEN);
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
