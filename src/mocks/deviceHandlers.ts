// src/mocks/handlers.js
import { DeviceStatusCardProps } from "@/types/device";
import { http, HttpResponse } from "msw";

export const deviceHandlers = [
  http.get("http://localhost:4862/api/device/status", async () => {
    const centerDevice: DeviceStatusCardProps[] = [
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
    return new HttpResponse(JSON.stringify(centerDevice), { status: 200 });
  }),
];
