"use client";
import React from "react";
import useQuickview from "@/hooks/useQuickview";
import "@/css/quickview.css";

const Quickview: React.FC = () => {
  const { quickviews, onCloseQuickViews } = useQuickview();
  const lastQuickView = quickviews[quickviews.length - 1];
  return quickviews.length ? (
    <>
      <div
        className="absolute left-0 top-0 z-9999 h-screen lg:w-1/2 quickviews-active"
        style={{
          background: "linear-gradient(rgb(0 0 0 / 20%), rgb(0 0 0 / 20%))",
        }}
      ></div>
      <aside
        className={`quickview-container border-[#eee] border-stroke absolute right-0 top-0 z-999 flex h-screen w-full lg:w-1/2 flex-col overflow-y-hidden bg-white duration-300 ease-linear
      }`}
      >
        {/* Header */}
        <div className="flex p-3 justify-between">
          <div>
            <h2>{lastQuickView.entity}</h2>
          </div>
          <div>
            <button onClick={onCloseQuickViews}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="18"
                height="18"
                viewBox="0 0 50 50"
              >
                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
              </svg>
            </button>
          </div>
        </div>
        {/* Content */}
        <div></div>
      </aside>
    </>
  ) : null;
};

export default Quickview;