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
import { useTranslations } from "next-intl";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";

const DeviceEditDialog = ({
  deviceSn,
}: {
  deviceSn: number;
}) => {
  const t = useTranslations("Index");
  const { isBoolean: open, setToggle, setFalse } = useBoolean(false);
  const { data: deviceDetail } = useGetDeviceDetail<IDeviceDetail>(deviceSn);
  const mutationDeviceUpdate = useDeviceUpdate();
  const methods = useForm<IDeviceDetailForm>({
    resolver: zodResolver(deviceDetailSchema),
  });

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
    setFalse(); // Dialog 닫기
  });
  return (
    <Dialog open={open} onOpenChange={setToggle}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-0.5 text-sm text-gray-500">
          <PencilLine className="w-4 h-4 text-mainBlue-600 dark:text-white" />
          <span className="text-mainBlue-600 dark:text-white">{t('btn_edit_submit')}</span>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2rem)] sm:w-full max-w-2xl rounded-2xl sm:rounded-xl">
        <DialogHeader className="gap-4">
          <DialogTitle className="text-xl font-semibold">
            <div className="flex gap-2 text-xl items-center">
              <div className="rounded-full p-2 bg-sub100"><Pencil className="w-4 h-4" /></div>
              {t('device_btn_edit')}
            </div>
            </DialogTitle>
          <DialogDescription className="text-sm">
            {t('device_edit_desc')}
          </DialogDescription>
          <form onSubmit={handleDeviceUpdate} className="flex flex-col gap-4">
            {/* TODO: 기기 타입 연동 전까지 드롭다운 숨김 처리 */}
            {/*
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
            */}

            <Label className="w-full flex flex-col gap-1" htmlFor="device_name">
              <h3 className="text-sm">{t('device_label_kiosk_name')}</h3>
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
              <h3 className="text-sm">{t('device_label_install_location')}</h3>
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
              <h3 className="text-sm">{t('device_label_install_address')}</h3>
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
              <h3 className="text-sm">{t('device_label_install_address_detail')}</h3>
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
                  {t('btn_cancel')}
                </Button>
              </DialogClose>
              <Button type="submit" className="border border-mainBlue-600 bg-mainBlue-100  dark:bg-mainBlue-900 hover:bg-white text-mainBlue-600 hover:text-mainBlue-600">
                {t('btn_edit_submit')}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeviceEditDialog;