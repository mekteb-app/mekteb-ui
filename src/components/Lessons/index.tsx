"use client";

import Status from "../common/Status";
import ProtectedLayout from "../Layouts/ProtectedLayout";
import { formatDate } from "@/utils/date";
import Pagination from "../Tables/Pagination";
import useLessons from "@/hooks/useLessons";
import Nivo from "../common/Nivo";
import { useEffect } from "react";

const Lessons: React.FC = () => {
  const { lessons, count, getLessons } = useLessons();

  useEffect(() => {
    getLessons(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProtectedLayout pageName="Lessons">
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
                <th className="px-4 py-2 font-medium text-black xl:pl-8">
                  Title
                </th>
                <th className="px-4 py-2 font-medium text-black">Nivo</th>
                <th className="px-4 py-2 font-medium text-black">
                  Description
                </th>
                <th className="px-4 py-2 font-medium text-black ">
                  Last updated date
                </th>
                <th className="px-4 py-2 font-medium text-black ">Status</th>
                <th className="px-4 py-2 font-medium text-black "></th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson, key) => (
                <tr key={key}>
                  {/* Title */}
                  <td className="min-w-[120px] border-b border-[#eee] px-4 py-2 pl-4 xl:pl-8">
                    <h5 className="font-medium text-black font-medium cursor-pointer hover:text-primary">
                      {lesson.title}
                    </h5>
                  </td>
                  {/* Nivo */}
                  <td className="min-w-[150px] border-b border-[#eee] px-4 py-2">
                    <Nivo nivo={lesson.nivo} />
                  </td>
                  {/* Description */}
                  <td className="min-w-[150px] border-b border-[#eee] px-4 py-2">
                    <p className="text-black font-medium cursor-pointer hover:text-primary">
                      {lesson.description || "N/A"}
                    </p>
                  </td>
                  {/* Created and updated dates */}
                  <td className="min-w-[150px] border-b border-[#eee] px-4 py-2">
                    <p className="text-black font-medium">
                      {formatDate(lesson.updated_at)}
                    </p>
                    <p className="font-medium text-xs">
                      {formatDate(lesson.created_at)}
                    </p>
                  </td>
                  {/* Status */}
                  <td className="border-b border-[#eee] px-4 py-2">
                    <Status status={lesson.status} />
                  </td>
                  <td className="border-b border-[#eee] px-4 py-2">
                    {/* TODO Uncomment when implement edit and remove functionalities */}
                    {/* <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary">
                        <EditIcon />
                      </button>
                      <Popover onConfirm={async () => {}}>
                        <button className="hover:text-primary">
                          <TrashCanIcon />
                        </button>
                      </Popover>
                    </div> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <Pagination totalCount={count || 0} onPageChange={getLessons} />
      </div>
    </ProtectedLayout>
  );
};

export default Lessons;
