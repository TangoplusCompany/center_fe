"use-client";

// import { Skeleton } from "@/components/ui/skeleton";
// import { useGetRecommendExercise } from "@/hooks/api/recommend/useGetREcommendExercise";

export interface ExerciseUserProps {
  user_uuid: string;
  user_sn: string;

}
// const DummyExerciseSkeleton = () => {
//   return (
//   <div className="flex flex-col gap-4 p-4 w-full h-128 rounded-3xl">
//     <Skeleton className="w-full h-80 rounded-xl" />
//     <Skeleton className="w-full h-80 rounded-xl" />
//     <Skeleton className="w-full h-80 rounded-xl" />
//   </div>
// )};


const RecommendUserContainer = ({
  // user_uuid, 
  // user_sn
}: ExerciseUserProps) => {
  // const {
  //   data: recExercise,
  //   isLoading: recExerciseLoading,
  //   isError: recExerciseError,
  // } = useGetRecommendExercise(
  //   user_uuid, 
  //   parseInt(user_sn) 
  // );
  

  // if (recExerciseLoading) {
  //   return (
  //     <div className="flex flex-col gap-4">
  //       <Skeleton className="w-full h-80 rounded-xl" />
  //       <DummyExerciseSkeleton /> 
  //     </div>
  //   ) 
  // }

  // if (recExerciseError) {
  //   return <div>오류가 발생했습니다</div>;
  // }

  return (
    <div className="flex flex-col gap-4">
      <div className="animate-in slide-in-from-top duration-300 fade-in delay-0 w-full h-64 border-2 border-sub200 rounded-3xl p-4">
        섹션1
      </div>
      
      <div className="flex flex-col gap-4 p-4 animate-in slide-in-from-top duration-300 fade-in delay-100 w-full h-128 border-2 border-sub200 rounded-3xl">
        
      </div>
    </div>
  );
}

export default RecommendUserContainer;