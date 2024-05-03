"use client";
import React, { useEffect } from "react";
import useQuickview from "@/hooks/useQuickview";
import "@/css/quickview.css";
import { Entity } from "@/enums/entity";
import UserQuickview from "../Users/Quickview";
import useUsers from "@/hooks/useUsers";
import useChildren from "@/hooks/useChildren";
import ChildQuickview from "../Children/Quickview";
import CurrentUserQuickview from "../CurrentUser/Quickview";

const Quickview: React.FC = () => {
  const { quickviews, onCloseQuickViews } = useQuickview();
  const lastQuickView = quickviews[quickviews.length - 1] || {};

  const { getUserDetails, user } = useUsers();
  const { child, getChildDetails } = useChildren();

  const getTitle = (entity: Entity | undefined) => {
    switch (entity) {
      case Entity.User:
        return "User quick view";
      case Entity.Child:
        return "Child quick view";
      case Entity.CurrentUser:
        return "Current user quick view";
      default:
        return "";
    }
  };

  useEffect(() => {
    switch (lastQuickView.entity) {
      case Entity.User:
        if (lastQuickView?.id && lastQuickView?.id !== user?.id)
          getUserDetails(lastQuickView.id);
        break;
      case Entity.Child:
        if (lastQuickView?.id && lastQuickView?.id !== child?.id)
          getChildDetails(lastQuickView.id);
        break;
      default:
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastQuickView?.id]);

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
        <div className="flex p-3 justify-between shadow-1">
          <div>
            <h2>{getTitle(lastQuickView.entity)}</h2>
          </div>
          <div className="flex align-items">
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
        <div className="p-3">
          {lastQuickView.entity === Entity.User && <UserQuickview />}
          {lastQuickView.entity === Entity.Child && <ChildQuickview />}
          {lastQuickView.entity === Entity.CurrentUser && (
            <CurrentUserQuickview />
          )}
        </div>
      </aside>
    </>
  ) : null;
};

export default Quickview;
