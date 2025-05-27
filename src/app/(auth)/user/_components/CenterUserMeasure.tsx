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
    // {
    //   title: "정면 측정",
    //   value: "front",
    //   component: () => <MeasureStaticFirst statics={measureData.static_1} />,
    // },
    // {
    //   title: "팔꿉 측정",
    //   value: "elbow",
    //   component: () => <MeasureStaticSecond statics={measureData.static_2} />,
    // },
    // {
    //   title: "좌측 측정",
    //   value: "left",
    //   component: () => <MeasureStaticThird statics={measureData.static_3} />,
    // },
    // {
    //   title: "우측 측정",
    //   value: "right",
    //   component: () => <MeasureStaticFourth statics={measureData.static_4} />,
    // },
    // {
    //   title: "후면 측정",
    //   value: "back",
    //   component: () => <MeasureStaticFifth statics={measureData.static_5} />,
    // },
    // {
    //   title: "후면 앉은 측정",
    //   value: "back_sit",
    //   component: () => <MeasureStaticSixth statics={measureData.static_6} />,
    // },
    // {
    //   title: "스쿼트 측정",
    //   value: "dynamic",
    //   component: () => <MeasureDetailDynamic dynamic={measureData.dynamic} />,
    // },
    {
      title: "정면 측정",
      value: "frontTotal",
      component: () => (
        <FrontMeasurement
          statics_1={measureData.static_1}
          statics_2={measureData.static_2}
        />
      ),
    },
    {
      title: "측면 측정",
      value: "SideTotal",
      component: () => (
        <SideMeasurement
          statics_3={measureData.static_3}
          statics_4={measureData.static_4}
        />
      ),
    },
    {
      title: "후면 측정",
      value: "BackTotal",
      component: () => (
        <BackMeasurement
          statics_5={measureData.static_5}
          statics_6={measureData.static_6}
        />
      ),
    },
    {
      title: "스쿼트 측정",
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
