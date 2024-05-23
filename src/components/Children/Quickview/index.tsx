import Status from "@/components/common/Status";
import useChildren from "@/hooks/useChildren";
import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import LessonsPane from "./lesson-pane";
import DetailsPane from "./details-pane";

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
          <Tab>Lessons</Tab>
        </TabList>

        <TabPanel>
          <DetailsPane />
        </TabPanel>

        <TabPanel>
          <LessonsPane />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default ChildQuickview;
