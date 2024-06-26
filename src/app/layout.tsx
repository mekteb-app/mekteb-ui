"use client";
import "@/css/satoshi.css";
import "@/css/style.css";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode, memo, useMemo, useState } from "react";
import Head from "next/head";
import { StoreProvider } from "./StoreProvider";
import SessionProvider from "../components/lib/JWTSessionProvider";
import { ToastContainer } from "react-toastify";

interface Props {
  readonly children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const memoizedChildren = useMemo(() => children, [children]);

  return (
    <StoreProvider>
      <SessionProvider>
        <html lang="en">
          <Head>
            <link rel="icon" href="./favicon.ico" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff" />
            <title>Mekteb app</title>
          </Head>
          <body suppressHydrationWarning={true}>
            <div className="dark:bg-boxdark-2 dark:text-bodydark">
              {memoizedChildren}
            </div>
            <ToastContainer position="bottom-right" />
          </body>
        </html>
      </SessionProvider>
    </StoreProvider>
  );
};
export default memo(RootLayout);
