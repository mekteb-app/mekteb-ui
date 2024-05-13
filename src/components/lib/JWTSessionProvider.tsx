"use client";
import { SESSION_TOKEN } from "@/constants";
import { setCurrentUserAsync } from "@/lib/features/currentUser/currentUserSlice";
import { useAppDispatch } from "@/lib/hooks";
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

  const dispatch = useAppDispatch();

  const [decodedSession, setDecodedSession] =
    React.useState<Record<string, unknown>>(initailState());

  React.useEffect(() => {
    async function load() {
      // Check if the session_token cookie exists
      const sessionToken = localStorage.getItem(SESSION_TOKEN);

      if (!sessionToken) {
        setDecodedSession({}); // No token, hence set to an empty object!
      } else {
        dispatch(setCurrentUserAsync(null));
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionContext.Provider value={decodedSession}>
      {children}
    </SessionContext.Provider>
  );
}

// Create and export session hook.
export const useSession = () => React.useContext(SessionContext);
