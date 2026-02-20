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
    <form className="my-5 min-w-0" onSubmit={handleSubmitDeviceAdd}>
      <legend className="sr-only">센터 기기 등록</legend>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3 min-w-0">
        <Label htmlFor="serial_number" className="text-sm font-medium sr-only">
          기기 시리얼 넘버
        </Label>
        <div className="min-w-0 flex-1">
          <Input
            id="serial_number"
            type="text"
            placeholder="기기 시리얼 넘버를 입력하세요."
            className="min-w-0"
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
        <Button
          type="submit"
          className="bg-sub600 shadow-none dark:text-sub100 hover:bg-sub300 shrink-0"
        >
          <Search className="w-4 h-4" />
          기기 검색
        </Button>
      </div>
    </form>
  );
};
