import { useDeviceUpdate } from "@/hooks/api/device/useDeviceUpdate";
import { useBoolean } from "@/hooks/utils/useBoolean";
import { deviceDetailSchema, IDeviceDetailForm } from "@/schemas/deviceSchema";
import { IDeviceDetail } from "@/types/device";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, PencilLine } from "lucide-react";
import { useForm } from "react-hook-form";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useGetDeviceDetail } from "@/hooks/api/device/useDeviceDetail";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const DeviceEditDialog = ({
  deviceSn,
}: {
  deviceSn: number;
}) => {
  const { isBoolean: open, setToggle: setOpen } = useBoolean(false);
  const { data: deviceDetail } = useGetDeviceDetail<IDeviceDetail>(deviceSn);
  const mutationDeviceUpdate = useDeviceUpdate();

  const methods = useForm<IDeviceDetailForm>({
    resolver: zodResolver(deviceDetailSchema),
  });

  // Dialog가 열릴 때 데이터를 form에 설정
  useEffect(() => {
    if (deviceDetail && open) {
      methods.reset({
        device_name: deviceDetail.data.device_name,
        install_location: deviceDetail.data.install_location,
        install_address_1: deviceDetail.data.install_address_1,
        install_address_2: deviceDetail.data.install_address_2,
      });
    }
  }, [deviceDetail, open, methods]);

  const handleDeviceUpdate = methods.handleSubmit(async (data) => {
    const deviceUpdateInfo = {
      sn: deviceSn,
      device_name: data.device_name,
      install_zipcode: "",
      install_address_1: data.install_address_1,
      install_address_2: data.install_address_2,
      install_location: data.install_location,
    };
    await mutationDeviceUpdate.mutateAsync(deviceUpdateInfo);
    setOpen();
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-0.5 text-sm text-gray-500">
          <PencilLine className="w-4 h-4" />
          <span>수정하기</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="gap-4">
          <DialogTitle className="text-xl font-semibold">
            <div className="flex gap-2 text-xl items-center">
              <div className="rounded-full p-2 bg-sub100"><Pencil className="w-4 h-4" /></div>
              기기 수정하기
            </div>
            </DialogTitle>
          <DialogDescription className="text-sm">
            Tango Body에 대한 정보를 수정합니다.
          </DialogDescription>
          <form onSubmit={handleDeviceUpdate} className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-1">
              <Select
                value={"0"} // deviceDetail?.data?.device_type?.toString() TODO 여기서 이제 Device Type에 맞게 변환 필요함
                disabled
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Tango Body Pro</SelectItem>
                  <SelectItem value="1">Tango Body Standard</SelectItem>
                  <SelectItem value="2">Tango Body Lite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Label className="w-full flex flex-col gap-1" htmlFor="device_name">
              <h3 className="text-sm">키오스크 명칭</h3>
              <Input
                {...methods.register("device_name")}
                className="w-full"
                id="device_name"
                maxLength={30}
              />
              {methods.formState.errors.device_name && (
                <span className="text-red-500 text-sm">
                  {methods.formState.errors.device_name.message as string}
                </span>
              )}
            </Label>

            <Label className="w-full flex flex-col gap-1" htmlFor="install_location">
              <h3 className="text-sm">설치 장소</h3>
              <Input
                {...methods.register("install_location")}
                className="w-full"
                id="install_location"
                maxLength={30}
              />
              {methods.formState.errors.install_location && (
                <span className="text-red-500 text-sm">
                  {methods.formState.errors.install_location.message as string}
                </span>
              )}
            </Label>

            <Label className="w-full flex flex-col gap-1" htmlFor="install_address_1">
              <h3 className="text-sm">설치 주소</h3>
              <Input
                {...methods.register("install_address_1")}
                className="w-full"
                id="install_address_1"
                maxLength={60}
              />
              {methods.formState.errors.install_address_1 && (
                <span className="text-red-500 text-sm">
                  {methods.formState.errors.install_address_1.message as string}
                </span>
              )}
            </Label>

            <Label className="w-full flex flex-col gap-1" htmlFor="install_address_2">
              <h3 className="text-sm">설치 상세 주소</h3>
              <Input
                {...methods.register("install_address_2")}
                className="w-full"
                id="install_address_2"
                maxLength={30}
              />
              {methods.formState.errors.install_address_2 && (
                <span className="text-red-500 text-sm">
                  {methods.formState.errors.install_address_2.message as string}
                </span>
              )}
            </Label>

            <div className="grid grid-cols-2 items-center gap-4 mt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="shadow-none border-sub200 border bg-white hover:sub300">
                  취소하기
                </Button>
              </DialogClose>
              <Button type="submit" className="border border-toggleAccent bg-toggleAccent-background hover:bg-white text-toggleAccent hover:text-toggleAccent">
                수정하기
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceEditDialog;