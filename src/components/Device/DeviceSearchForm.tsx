import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { IDeviceSearchForm } from "@/schemas/deviceSchema";
import { Search } from "lucide-react";

export const DeviceSearchForm = ({
  register,
  handleSubmitDeviceAdd,
  errors,
}: {
  register: UseFormReturn<IDeviceSearchForm>["register"];
  handleSubmitDeviceAdd: () => void;
  errors: UseFormReturn<IDeviceSearchForm>["formState"]["errors"];
}) => {
  return (
    <form className="my-5" onSubmit={handleSubmitDeviceAdd}>
      <legend className="sr-only">센터 기기 등록</legend>
      <div className="flex items-start justify-center gap-4">
        <Label htmlFor="serial_number" className="text-sm font-medium sr-only">
          기기 시리얼 넘버
        </Label>
        <div className="w-full">
          <Input
            id="serial_number"
            type="text"
            placeholder="기기 시리얼 넘버를 입력하세요."
            {...register("serial_number")}
            maxLength={50}
          />
          {errors.serial_number && (
            <p className="text-sm text-red-500 mt-1">
              {typeof errors.serial_number?.message === "string" &&
                errors.serial_number?.message}
            </p>
          )}
        </div>
        <Button type="submit" className="bg-sub600 shadow-none text-white">
          <Search className="w-4 h-4" />  
          기기 검색
        </Button>
      </div>
    </form>
  );
};
