import Nivo from "@/components/common/Nivo";
import Role from "@/components/common/Role";
import Status from "@/components/common/Status";
import useUsers from "@/hooks/useUsers";
import { IChild } from "@/interfaces/IChild";
import { formatDate } from "@/utils/date";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const UserQuickview: React.FC = () => {
  const { user } = useUsers();
  return (
    <>
      {/* Header container */}
      <div className="flex w-full justify-end pb-3">
        <Status status={user.status} />
      </div>
      {/* Tabs container */}
      <Tabs>
        <TabList>
          <Tab>Details</Tab>
          <Tab>Children</Tab>
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
                <td>{`${user?.first_name} ${user?.last_name}`}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{`${user?.email}`}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{`${user?.phone}`}</td>
              </tr>
              <tr>
                <td>Role</td>
                <td>
                  <Role role={user.role} />
                </td>
              </tr>
              <tr>
                <td>Community</td>
                <td>{`${user?.community?.name || "N/A"}`}</td>
              </tr>
              <tr>
                <td>Created at</td>
                <td>{`${formatDate(user.created_at)}`}</td>
              </tr>
              <tr>
                <td>Updated at</td>
                <td>{`${formatDate(user.updated_at)}`}</td>
              </tr>
            </tbody>
          </table>
        </TabPanel>

        <TabPanel>
          {user?.children?.length ? (
            user?.children?.map((child: IChild, index: number) => (
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
      </Tabs>
    </>
  );
};

export default UserQuickview;
