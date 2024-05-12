"use client";
import React, { useEffect, useState } from "react";
import Status from "../common/Status";
import ProtectedLayout from "../Layouts/ProtectedLayout";
import { formatDate } from "@/utils/date";
import Pagination from "../Tables/Pagination";
import useChildren from "@/hooks/useChildren";
import ChildForm from "./ChildForm";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser } from "@/lib/features/currentUser/currentUserSlice";
import { Role } from "@/enums/role";
import { Entity } from "@/enums/entity";
import useQuickview from "@/hooks/useQuickview";
import Nivo from "../common/Nivo";
import CreateUserIcon from "../Icons/create-user";
import EditIcon from "../Icons/edit.icon";
import TrashCanIcon from "../Icons/trash-can.icon";
import Popover from "../Popover";

const Children: React.FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const {
    children,
    count,
    child,
    getChildDetails,
    getChildren,
    resetChildDetails,
    removeChild,
  } = useChildren();
  const { onOpenQuickview } = useQuickview();

  const [childModalOpen, setChildModalOpen] = useState(false);

  const closeChildModal = () => {
    setChildModalOpen(false);
    resetChildDetails();
  };

  useEffect(() => {
    getChildren(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProtectedLayout pageName="Children">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 lg:pb-1">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 max-w-[300px] sm:w-1/2">
            <input
              type="text"
              placeholder="Default Input"
              className="text-sm w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
            />
          </div>
          <div className="flex">
            <button
              className="flex bg-primary px-3 py-2 text-center text-white hover:bg-opacity-90 lg:px-3 xl:px-4 text-sm rounded align-middle items-center"
              onClick={() => setChildModalOpen(true)}
            >
              <CreateUserIcon />
              <div className="ml-1 hidden lg:block">Create child</div>
            </button>
            <ChildForm
              open={childModalOpen}
              onClose={closeChildModal}
              child={child}
            />
          </div>
        </div>
        <div className="max-w-full overflow-x-auto mt-4">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-2 text-left ">
                <th className="px-4 py-2 font-medium text-black">Name</th>
                <th className="px-4 py-2 font-medium text-black">Nivo</th>
                <th className="px-4 py-2 font-medium text-black ">Birthdate</th>
                {currentUser?.role === Role.SuperAdmin && (
                  <th className="px-4 py-2 font-medium text-black ">
                    Community
                  </th>
                )}
                <th className="px-4 py-2 font-medium text-black ">
                  Last updated date
                </th>
                <th className="px-4 py-2 font-medium text-black ">Status</th>
                <th className="px-4 py-2 font-medium text-black "></th>
              </tr>
            </thead>
            <tbody>
              {children.map((child, key) => (
                <tr key={key}>
                  {/* Name */}
                  <td className="min-w-[120px] border-b border-[#eee] px-4 py-2 pl-4">
                    <h5
                      className="font-medium text-black font-medium cursor-pointer hover:text-primary"
                      onClick={() => onOpenQuickview(Entity.Child, child.id)}
                    >
                      {`${child.first_name} ${child.last_name}`}
                    </h5>
                  </td>
                  {/* Email */}
                  <td className="min-w-[150px] border-b border-[#eee] px-4 py-2">
                    <Nivo nivo={child.nivo} />
                  </td>
                  {/* Phone */}
                  <td className="border-b border-[#eee] px-4 py-2">
                    <p className="text-black font-medium">
                      {formatDate(child.birthdate, "dd/MM/yyyy")}
                    </p>
                  </td>
                  {/* Community */}
                  {currentUser?.role === Role.SuperAdmin && (
                    <td className="border-b border-[#eee] px-4 py-2">
                      <p className="text-black font-medium">
                        {child.community?.name || "N/A"}
                      </p>
                    </td>
                  )}
                  {/* Created and updated dates */}
                  <td className="min-w-[150px] border-b border-[#eee] px-4 py-2">
                    <p className="text-black font-medium">
                      {formatDate(child.updated_at)}
                    </p>
                    <p className="font-medium text-xs">
                      {formatDate(child.created_at)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-2">
                    <Status status={child.status} />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-2">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          getChildDetails(child.id);
                          setChildModalOpen(true);
                        }}
                      >
                        <EditIcon />
                      </button>
                      <Popover
                        onConfirm={async () => {
                          await removeChild(child.id);
                        }}
                      >
                        <button className="hover:text-primary">
                          <TrashCanIcon />
                        </button>
                      </Popover>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <Pagination totalCount={count} onPageChange={getChildren} />
      </div>
    </ProtectedLayout>
  );
};

export default Children;
