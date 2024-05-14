"use client";
import React, { useEffect } from "react";
import Status from "../common/Status";
import ProtectedLayout from "../Layouts/ProtectedLayout";
import { formatDate } from "@/utils/date";
import Pagination from "../Tables/Pagination";
import useCommunity from "@/hooks/useCommunity";

const Communities: React.FC = () => {
  const { communities, count, getCommunities } = useCommunity();

  useEffect(() => {
    getCommunities(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProtectedLayout pageName="Communities">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default sm:px-7.5 lg:pb-1">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 max-w-[300px] sm:w-1/2">
            <input
              type="text"
              placeholder="Default Input"
              className="text-sm w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-3 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
            />
          </div>
          <div className="flex" />
        </div>
        <div className="max-w-full overflow-x-auto mt-4">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-gray-2 text-left ">
                <th className="px-4 py-2 font-medium text-black">Name</th>
                <th className="px-4 py-2 font-medium text-black ">
                  Last updated date
                </th>
                <th className="px-4 py-2 font-medium text-black ">Status</th>
                <th className="px-4 py-2 font-medium text-black "></th>
              </tr>
            </thead>
            <tbody>
              {communities.map((community, key) => (
                <tr key={key}>
                  {/* Name */}
                  <td className="min-w-[120px] border-b border-[#eee] px-4 py-2 pl-4">
                    <h5 className="font-medium text-black font-medium">
                      {community.name}
                    </h5>
                  </td>

                  {/* Created and updated dates */}
                  <td className="min-w-[150px] border-b border-[#eee] px-4 py-2">
                    <p className="text-black font-medium">
                      {formatDate(community.updated_at)}
                    </p>
                    <p className="font-medium text-xs">
                      {formatDate(community.created_at)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-2">
                    <Status status={community.status} />
                  </td>
                  {/* TODO Uncomment when we implement edit and delete */}
                  {/* <td className="border-b border-[#eee] px-4 py-2">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary">
                        <EditIcon />
                      </button>
                      <Popover onConfirm={async () => {}}>
                        <button className="hover:text-primary">
                          <TrashCanIcon />
                        </button>
                      </Popover>
                    </div>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <Pagination totalCount={count} onPageChange={getCommunities} />
      </div>
    </ProtectedLayout>
  );
};

export default Communities;
