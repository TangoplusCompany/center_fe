import React, { useState, useEffect, useCallback } from "react";
import SkeletonBack from "./SkeletonBack";
import SkeletonFront from "./SkeletonFront";
import { IFilterMeasureInfo } from "@/types/user";

const SkeletonBox = ({ data }: { data: IFilterMeasureInfo }) => {
  const [view, setView] = useState("front");
  const [viewState, setViewState] = useState(true);
  const viewStateHandle = useCallback(() => {
    setViewState(!viewState);
  }, [viewState]);
  useEffect(() => {
    if (viewState) {
      setView("front");
    } else {
      setView("back");
    }
  }, [viewState]);
  return (
    <div className="relative box-border flex justify-center rounded border border-stroke bg-gray px-4 py-3 text-black  focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary">
      <button
        className="absolute right-3 top-3 z-10"
        title="앞/뒤 보기"
        onClick={viewStateHandle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className="spin_animation"
        >
          <path
            fill="currentColor"
            d="M4 20v-2h2.75l-.4-.35q-1.225-1.225-1.787-2.662T4 12.05q0-2.775 1.663-4.937T10 4.25v2.1Q8.2 7 7.1 8.563T6 12.05q0 1.125.425 2.188T7.75 16.2l.25.25V14h2v6zm10-.25v-2.1q1.8-.65 2.9-2.212T18 11.95q0-1.125-.425-2.187T16.25 7.8L16 7.55V10h-2V4h6v2h-2.75l.4.35q1.225 1.225 1.788 2.663T20 11.95q0 2.775-1.662 4.938T14 19.75"
          />
        </svg>
      </button>
      <div className="relative z-0 md:max-h-full skeleton">
        <SkeletonFront
          className={`${
            view === "front" ? "on_view" : "off_view"
          } h-full w-full `}
          data={data}
        />
        <SkeletonBack
          className={`${
            view === "back" ? "on_view" : "off_view"
          } h-full w-full `}
          data={data}
        />
      </div>
    </div>
  );
};

export default SkeletonBox;
