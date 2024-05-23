import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";

type tabListType = {
  tabName: string;
  value: string;
  tabUi: React.ReactNode;
}[];

interface TabProps {
  tabList: tabListType;
  defaultTabValue: string;
}

const Tab: FC<TabProps> = ({ tabList, defaultTabValue, ...props }) => {
  return (
    <Tabs defaultValue={defaultTabValue} className="">
      <TabsList className="grid w-full grid-cols-2 rounded-none relative">
        {tabList.map((tab, index) => {
          return (
            <TabsTrigger value={tab.value} key={tab.tabName + index}>
              {tab.tabName}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {tabList.map((tab, index) => {
        return (
          <TabsContent value={tab.value} key={tab.value + index + Date.now()}
            className="m-0 rounded-none"
          >
            <Card className="rounded-none pt-2">
              <CardContent className="space-y-2 flex justify-center items-start">{tab.tabUi}</CardContent>
            </Card>
          </TabsContent>
        );
      })}
      
    </Tabs>
  );
};

export default Tab;
