"use client";

import { useDrawCanvas } from "@/hooks/utils";
import { IMeasureJson } from "@/types/measure";
import React, { useEffect, useRef } from "react";

const ShoulderMoveLine = ({
  nowWidth,
  nowHeight,
  measureJson,
}: {
  nowWidth: number;
  nowHeight: number;
  measureJson: IMeasureJson[];
}) => {
  const canvasLeftBlueRef = useRef<HTMLCanvasElement | null>(null);
  const canvasLeftRedRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRightBlueRef = useRef<HTMLCanvasElement | null>(null);
  const canvasRightRedRef = useRef<HTMLCanvasElement | null>(null);

  const scaleWidth = 400 / nowWidth;
  const scaleHeight = 400 / nowHeight;

  const clearAndDraw = useDrawCanvas;
  useEffect(() => {
    if (!measureJson) return;
    const measureJsonLength = measureJson.length - 1;
    const canvasLeftBlue = canvasLeftBlueRef.current as HTMLCanvasElement;
    const canvasLeftRed = canvasLeftRedRef.current as HTMLCanvasElement;
    const canvasRightBlue = canvasRightBlueRef.current as HTMLCanvasElement;
    const canvasRightRed = canvasRightRedRef.current as HTMLCanvasElement;

    const contextLeftBlue = canvasLeftBlue.getContext(
      "2d",
    ) as CanvasRenderingContext2D;
    const contextLeftRed = canvasLeftRed.getContext(
      "2d",
    ) as CanvasRenderingContext2D;
    const contextRightBlue = canvasRightBlue.getContext(
      "2d",
    ) as CanvasRenderingContext2D;
    const contextRightRed = canvasRightRed.getContext(
      "2d",
    ) as CanvasRenderingContext2D;

    const drawCanvas = () => {
      clearAndDraw(
        contextLeftBlue,
        canvasLeftBlue,
        "#0000FF",
        () => {
          contextLeftBlue.beginPath();
          measureJson
            .slice(0, measureJsonLength / 2)
            .forEach((frame, index) => {
              if (index === 0) {
                return contextLeftBlue.moveTo(
                  frame.pose_landmark[11].sx * scaleWidth,
                  frame.pose_landmark[11].sy * scaleHeight,
                );
              }
              return contextLeftBlue.lineTo(
                frame.pose_landmark[11].sx * scaleWidth,
                frame.pose_landmark[11].sy * scaleHeight,
              );
            });
          contextLeftBlue.stroke();
        },
        1,
      );

      clearAndDraw(
        contextLeftRed,
        canvasLeftRed,
        "#FF0000",
        () => {
          contextLeftRed.beginPath();
          measureJson
            .slice(measureJsonLength / 2, measureJsonLength)
            .forEach((frame, index) => {
              if (index === 0) {
                return contextLeftRed.moveTo(
                  frame.pose_landmark[11].sx * scaleWidth,
                  frame.pose_landmark[11].sy * scaleHeight,
                );
              }
              return contextLeftRed.lineTo(
                frame.pose_landmark[11].sx * scaleWidth,
                frame.pose_landmark[11].sy * scaleHeight,
              );
            });
          contextLeftRed.stroke();
        },
        1,
      );
      clearAndDraw(
        contextRightBlue,
        canvasRightBlue,
        "#0000FF",
        () => {
          contextRightBlue.beginPath();
          measureJson
            .slice(0, measureJsonLength / 2)
            .forEach((frame, index) => {
              if (index === 0) {
                contextRightBlue.moveTo(
                  frame.pose_landmark[12].sx * scaleWidth,
                  frame.pose_landmark[12].sy * scaleHeight,
                );
              }
              contextRightBlue.lineTo(
                frame.pose_landmark[12].sx * scaleWidth,
                frame.pose_landmark[12].sy * scaleHeight,
              );
            });
          contextRightBlue.stroke();
        },
        1,
      );
      clearAndDraw(
        contextRightRed,
        canvasRightRed,
        "#FF0000",
        () => {
          contextRightRed.beginPath();
          measureJson
            .slice(measureJsonLength / 2, measureJsonLength)
            .forEach((frame, index) => {
              if (index === 0) {
                contextRightRed.moveTo(
                  frame.pose_landmark[12].sx * scaleWidth,
                  frame.pose_landmark[12].sy * scaleHeight,
                );
              }
              contextRightRed.lineTo(
                frame.pose_landmark[12].sx * scaleWidth,
                frame.pose_landmark[12].sy * scaleHeight,
              );
            });
          contextRightRed.stroke();
        },
        1,
      );
    };
    drawCanvas();
  }, [measureJson, clearAndDraw, scaleHeight, scaleWidth]);
  return (
    <div className="relative w-full p-5 flex items-center justify-center overflow-hidden bg-border rounded gap-10">
      <div className="flex items-start justify-center gap-5">
        <p>좌측 어깨 이동 궤적</p>
        <div className="relative w-[200px] h-[200px] overflow-hidden rounded bg-white">
          <canvas
            ref={canvasLeftBlueRef}
            width={400}
            height={400}
            className="absolute bottom-0 -left-1/2 right-0 -top-1/2 z-[9] -scale-x-[1] pointer-events-none"
          />
          <canvas
            ref={canvasLeftRedRef}
            width={400}
            height={400}
            className="absolute bottom-0 -left-1/2 right-0 -top-1/2 z-[9] -scale-x-[1] pointer-events-none"
          />
        </div>
      </div>
      <div className="flex items-start justify-center gap-5">
        <p>우측 어깨 이동 궤적</p>
        <div className="relative w-[200px] h-[200px] overflow-hidden rounded bg-white">
          <canvas
            ref={canvasRightBlueRef}
            width={400}
            height={400}
            className="absolute bottom-0 -left-1/2 right-0 -top-1/2 z-[9] -scale-x-[1] pointer-events-none"
          />
          <canvas
            ref={canvasRightRedRef}
            width={400}
            height={400}
            className="absolute bottom-0 -left-1/2 right-0 -top-1/2 z-[9] -scale-x-[1] pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ShoulderMoveLine;
