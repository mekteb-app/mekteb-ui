import Nivo from "@/components/common/Nivo";
import Status from "@/components/common/Status";
import useChildren from "@/hooks/useChildren";
import { formatDate } from "@/utils/date";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

const ChildQuickview: React.FC = () => {
  const { child } = useChildren();
  return (
    <>
      {/* Header container */}
      <div className="flex w-full justify-end pb-3">
        <Status status={child?.status} />
      </div>
      {/* Tabs container */}
      <Tabs>
        <TabList>
          <Tab>Details</Tab>
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
                <td>{`${child?.first_name} ${child?.last_name}`}</td>
              </tr>
              <tr>
                <td>Nivo</td>
                <td>
                  <Nivo nivo={child?.nivo} />
                </td>
              </tr>
              <tr>
                <td>Birthdate</td>
                <td>{formatDate(child?.birthdate, "dd/MM/yyyy")}</td>
              </tr>
              <tr>
                <td>Community</td>
                <td>{`${child?.community?.name || "N/A"}`}</td>
              </tr>
              <tr>
                <td>Created at</td>
                <td>{`${formatDate(child?.created_at)}`}</td>
              </tr>
              <tr>
                <td>Updated at</td>
                <td>{`${formatDate(child?.updated_at)}`}</td>
              </tr>
            </tbody>
          </table>
        </TabPanel>

        <TabPanel>
          {child?.messages?.length ? (
            child?.messages?.map((message: any) => (
              <div key={message?.id}></div>
            ))
          ) : (
            <div className="text-sm p-2">No messages.</div>
          )}
        </TabPanel>
      </Tabs>
    </>
  );
};

export default ChildQuickview;
