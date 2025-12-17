"use client";

import { IUserDetailDynamic, IUserDetailStatic } from "@/types/measure";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeasureDetailDynamic from "@/components/Measure/DetailDynamic";
import React, { JSX } from "react";
import FrontMeasurement from "../Measure/Static/FrontMeasurement";
import SideMeasurement from "../Measure/Static/SideMeasurement";
import BackMeasurement from "../Measure/Static/BackMeasurement";

type MeasureListType = {
  title: string;
  value: string;
  component: () => JSX.Element;
};

const MeasurementList = ({
  measureData,
}: {
  measureData: {
    dynamic: IUserDetailDynamic;
    static_1: IUserDetailStatic;
    static_2: IUserDetailStatic;
    static_3: IUserDetailStatic;
    static_4: IUserDetailStatic;
    static_5: IUserDetailStatic;
    static_6: IUserDetailStatic;
  };
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

export default MeasurementList;
