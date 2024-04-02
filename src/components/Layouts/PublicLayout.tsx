"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark h-full">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full lg:block lg:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <span className="mt-15 inline-block">
                <Image
                  className="dark"
                  src={"/images/cover/auth_cover.png"}
                  alt="Logo"
                  width={350}
                  height={32}
                />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark lg:w-1/2 lg:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <div className="w-full lg:block text-center">
                <Link className="mb-5.5 inline-block" href="/">
                  <Image
                    className="dark"
                    src={"/images/logo/logo.png"}
                    alt="Logo"
                    width={100}
                    height={32}
                  />
                </Link>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
