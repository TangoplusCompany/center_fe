"use client";

import {
  IUserMeasurement,
} from "@/types/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasureDetailDynamic from "@/components/Measure/DetailDynamic";
import React, { JSX } from "react";
import BackMeasurement from "@/components/Measure/Static/BackMeasurement";
import FrontMeasurement from "@/components/Measure/Static/FrontMeasurement";
import SideMeasurement from "@/components/Measure/Static/SideMeasurement";

type MeasureListType = {
  title: string;
  value: string;
  component: () => JSX.Element;
};

const CenterUserMeasure = ({
  measureData,
}: {
  measureData: IUserMeasurement;
}) => {
  const measureList: MeasureListType[] = [
    {
      title: "정면 자세",
      value: "frontTotal",
      component: () => (
        <FrontMeasurement
          statics_1={measureData.static_1}
          statics_2={measureData.static_2}
        />
      ),
    },
    {
      title: "측면 자세",
      value: "SideTotal",
      component: () => (
        <SideMeasurement
          statics_3={measureData.static_3}
          statics_4={measureData.static_4}
        />
      ),
    },
    {
      title: "후면 자세",
      value: "BackTotal",
      component: () => (
        <BackMeasurement
          statics_5={measureData.static_5}
          statics_6={measureData.static_6}
        />
      ),
    },
    {
      title: "스쿼트 자세",
      value: "dynamic",
      component: () => <MeasureDetailDynamic dynamic={measureData.dynamic} />,
    },
  ];
  return (
    <Tabs defaultValue="frontTotal" className="w-full">
      <TabsList>
        {measureList.map((measure: Omit<MeasureListType, "component">) => (
          <TabsTrigger key={measure.value} value={measure.value}>
            {measure.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {measureList.map((measure: MeasureListType) => (
        <TabsContent
          key={measure.value}
          value={measure.value}
          className="!mt-0"
        >
          {measure.component()}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default CenterUserMeasure;
