// src/mocks/handlers.js
import { IDeviceStatusCardProps } from "@/types/device";
import { http, HttpResponse } from "msw";

const centerDevice: IDeviceStatusCardProps[] = [
  {
    sn: 0,
    serial_number: "SERIALNUMBER1",
    install_location: "(주)옵토닉스",
    install_address: "광주광역시 북구 첨단벤처소로 37번길 7",
    install_address_detail: "1층(월출동)",
    install_zipcode: "36632",
    device_name: "탱고바디1",
    reg_date: new Date(),
    modify_date: new Date(),
    upload_date: new Date(),
    uploaded: "1",
    used: "0",
    reg_status: "1",
  },
  {
    sn: 1,
    serial_number: "SERIALNUMBER2",
    install_location: "(주)옵토닉스",
    install_address: "광주광역시 북구 첨단벤처소로 37번길 7",
    install_address_detail: "1층(월출동)",
    install_zipcode: "36632",
    device_name: "탱고바디2",
    reg_date: new Date(),
    modify_date: new Date(),
    upload_date: new Date(),
    uploaded: "1",
    used: "1",
    reg_status: "1",
  },
];

export const deviceHandlers = [
  http.get("http://localhost:4862/api/device/status", async () => {
    return new HttpResponse(JSON.stringify(centerDevice), { status: 200 });
  }),
  http.get(
    "http://localhost:4862/api/device/:id",
    async ({ params }: { params: { id: string } }) => {
      const { id } = params;
      const checkNumber = /^\d+$/.test(id);
      if (!checkNumber) {
        return new HttpResponse(
          JSON.stringify({ error: "잘못된 접근입니다." }),
          { status: 400 },
        );
      }
      const device: IDeviceStatusCardProps | undefined = centerDevice.find(
        (el) => el.sn === parseInt(id),
      );
      if (!device) {
        return new HttpResponse(
          JSON.stringify({ error: "기기를 찾을 수 없습니다." }),
          { status: 404 },
        );
      }
      return new HttpResponse(JSON.stringify(device), { status: 200 });
    },
  ),
];
