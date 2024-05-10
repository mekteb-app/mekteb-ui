"use client";

import {
  resetError,
  selectUserError,
  selectUsers,
  selectUsersCount,
  setUsersAsync,
} from "@/lib/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import Status from "../common/Status";
import ProtectedLayout from "../Layouts/ProtectedLayout";
import { formatDate } from "@/utils/date";
import Pagination from "../Tables/Pagination";
import UserForm from "./UserForm";
import useErrorHandling from "@/hooks/useErrorHandling";
import { selectCurrentUser } from "@/lib/features/currentUser/currentUserSlice";
import { Role as RoleEnum } from "@/enums/role";
import { Entity } from "@/enums/entity";
import useQuickview from "@/hooks/useQuickview";
import Role from "@/components/common/Role";
import CreateUserIcon from "../Icons/create-user";
import useUsers from "@/hooks/useUsers";
import EyeIcon from "../Icons/eye.icon";
import TrashCanIcon from "../Icons/trash-can.icon";
import EditIcon from "../Icons/edit.icon";

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setError } = useErrorHandling();
  const users = useAppSelector(selectUsers) || [];
  const usersCount = useAppSelector(selectUsersCount);
  const error = useAppSelector(selectUserError);
  const currentUser = useAppSelector(selectCurrentUser);
  const { onOpenQuickview } = useQuickview();

  const { user, getUserDetails } = useUsers();

  const [userModalOpen, setUserModalOpen] = useState(false);

  const onPageChange = (selected = 0) => {
    fetchData(selected);
  };

  const fetchData = async (page = 0) => {
    try {
      await dispatch(setUsersAsync(page));
    } catch (error) {
      setError(error as any);
    }
  };

  useEffect(() => {
    fetchData(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      setError(error);
    }

    dispatch(resetError());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <ProtectedLayout pageName="Users">
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
              onClick={() => setUserModalOpen(true)}
            >
              <CreateUserIcon />
              <div className="ml-1 hidden lg:block">Create user</div>
            </button>
            <UserForm
              open={userModalOpen}
              onClose={() => setUserModalOpen(false)}
              user={user}
            />
          </div>
        </div>
        <div className="max-w-full overflow-x-auto mt-4">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-2 text-left ">
                <th className="px-4 py-2 font-medium text-black xl:pl-8">
                  Name
                </th>
                <th className="px-4 py-2 font-medium text-black">Email</th>
                <th className="px-4 py-2 font-medium text-black ">Phone</th>
                {currentUser?.role === RoleEnum.SuperAdmin && (
                  <th className="px-4 py-2 font-medium text-black ">
                    Community
                  </th>
                )}
                {currentUser?.role === RoleEnum.SuperAdmin && (
                  <th className="px-4 py-2 font-medium text-black ">Role</th>
                )}
                <th className="px-4 py-2 font-medium text-black ">
                  Last updated date
                </th>
                <th className="px-4 py-2 font-medium text-black ">Status</th>
                <th className="px-4 py-2 font-medium text-black "></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, key) => (
                <tr key={key}>
                  {/* Name */}
                  <td className="min-w-[120px] border-b border-[#eee] px-4 py-2 pl-4 xl:pl-8">
                    <h5
                      className="font-medium text-black font-medium cursor-pointer hover:text-primary"
                      onClick={() => onOpenQuickview(Entity.User, user.id)}
                    >
                      {`${user.first_name} ${user.last_name}`}
                    </h5>
                  </td>
                  {/* Email */}
                  <td className="min-w-[150px] border-b border-[#eee] px-4 py-2">
                    <p
                      className="text-black font-medium cursor-pointer hover:text-primary"
                      onClick={() => onOpenQuickview(Entity.User, user.id)}
                    >
                      {user.email}
                    </p>
                  </td>
                  {/* Phone */}
                  <td className="border-b border-[#eee] px-4 py-2">
                    <p className="text-black font-medium">{user.phone}</p>
                  </td>
                  {/* Community */}
                  {currentUser?.role === RoleEnum.SuperAdmin && (
                    <td className="border-b border-[#eee] px-4 py-2">
                      <p className="text-black font-medium">
                        {user.community?.name || "N/A"}
                      </p>
                    </td>
                  )}
                  {/* Role */}
                  {currentUser?.role === RoleEnum.SuperAdmin && (
                    <td className="border-b border-[#eee] px-4 py-2">
                      <Role role={user.role} />
                    </td>
                  )}
                  {/* Created and updated dates */}
                  <td className="min-w-[150px] border-b border-[#eee] px-4 py-2">
                    <p className="text-black font-medium">
                      {formatDate(user.updated_at)}
                    </p>
                    <p className="font-medium text-xs">
                      {formatDate(user.created_at)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-2">
                    <Status status={user.status} />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-2">
                    <div className="flex items-center space-x-3.5">
                      <button
                        className="hover:text-primary"
                        onClick={() => {
                          getUserDetails(user.id);
                          setUserModalOpen(true);
                        }}
                      >
                        <EditIcon />
                      </button>
                      <button className="hover:text-primary">
                        <TrashCanIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <Pagination totalCount={usersCount || 0} onPageChange={onPageChange} />
      </div>
    </ProtectedLayout>
  );
};

export default Users;
