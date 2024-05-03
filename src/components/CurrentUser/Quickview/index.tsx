import Nivo from "@/components/common/Nivo";
import Role from "@/components/common/Role";
import Status from "@/components/common/Status";
import { IChild } from "@/interfaces/IChild";
import { selectCurrentUser } from "@/lib/features/currentUser/currentUserSlice";
import { useAppSelector } from "@/lib/hooks";
import { formatDate } from "@/utils/date";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const CurrentUserQuickview: React.FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <>
      {/* Header container */}
      <div className="flex w-full justify-end pb-3">
        <Status status={currentUser?.status} />
      </div>
      {/* Tabs container */}
      <Tabs>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Children</Tab>
          <Tab>Settings</Tab>
        </TabList>

        <TabPanel>
          <table className="quickview-content text-sm">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{`${currentUser?.first_name} ${currentUser?.last_name}`}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{`${currentUser?.email}`}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{`${currentUser?.phone}`}</td>
              </tr>
              <tr>
                <td>Role</td>
                <td>
                  <Role role={currentUser?.role} />
                </td>
              </tr>
              <tr>
                <td>Community</td>
                <td>{`${currentUser?.community?.name || "N/A"}`}</td>
              </tr>
              <tr>
                <td>Created at</td>
                <td>{`${formatDate(currentUser?.created_at)}`}</td>
              </tr>
              <tr>
                <td>Updated at</td>
                <td>{`${formatDate(currentUser?.updated_at)}`}</td>
              </tr>
            </tbody>
          </table>
        </TabPanel>

        <TabPanel>
          {currentUser?.children?.length ? (
            currentUser?.children?.map((child: IChild, index: number) => (
              <div className="py-2 text-sm" key={child.id || index}>
                <div className="py-2">
                  <label className="font-bold">{`Child ${index + 1}`}</label>
                </div>
                <div className="px-2">
                  <table className="quickview-content p-2">
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Name</td>
                        <td>{`${child?.first_name} ${child?.last_name}`}</td>
                      </tr>
                      <tr>
                        <td>Nivo</td>
                        <td>
                          <Nivo nivo={child?.nivo} />
                        </td>
                      </tr>
                      <tr>
                        <td>Community</td>
                        <td>{`${child?.community?.name || "N/A"}`}</td>
                      </tr>
                      <tr>
                        <td>Created at</td>
                        <td>{`${formatDate(child.created_at)}`}</td>
                      </tr>
                      <tr>
                        <td>Updated at</td>
                        <td>{`${formatDate(child.updated_at)}`}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm p-2">No children added.</div>
          )}
        </TabPanel>

        <TabPanel>
          <div className="text-sm p-2">Settings</div>
        </TabPanel>
      </Tabs>
    </>
  );
};

export default CurrentUserQuickview;
