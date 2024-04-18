"use client";
import { SESSION_TOKEN } from "@/constants";
import { getCurrentUser } from "@/lib/features/currentUser/currentUserAPI";
import React from "react";
import { toast } from "react-toastify";

// Create context.
interface SessionContextType {
  accessToken?: string;
  email?: string;
  role?: number;
}

const SessionContext = React.createContext<SessionContextType>({});

export default function JWTSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initailState = () => {
    if (typeof window !== "undefined") {
      return {
        accessToken: window.localStorage.getItem(SESSION_TOKEN) || "",
        email: "",
        role: 0,
      };
    }
    return {};
  };

  const [decodedSession, setDecodedSession] =
    React.useState<Record<string, unknown>>(initailState());

  React.useEffect(() => {
    async function load() {
      // Check if the session_token cookie exists
      const sessionToken = localStorage.getItem(SESSION_TOKEN);

      if (!sessionToken) {
        setDecodedSession({}); // No token, hence set to an empty object!
      } else {
        // Verify token.
        try {
          const decodedToken = await getCurrentUser();
          setDecodedSession(decodedToken);
        } catch (error) {
          toast.error("Failed to fetch current user");
        }
      }
    }
    load();
  }, []);

  return (
    <SessionContext.Provider value={decodedSession}>
      {children}
    </SessionContext.Provider>
  );
}

// Create and export session hook.
export const useSession = () => React.useContext(SessionContext);
