import { IResponseDefault } from "./default";

export interface IDeviceStatusCardProps {
  sn: number;
  serial_number: string;
  install_location: string;
  install_address_1: string;
  install_address_2: string;
  install_zipcode: string;
  device_name: string;
  reg_date: Date;
  modify_date: Date;
  upload_date: Date;
  uploaded: string;
  used: string;
  reg_status: string;
}

export interface IDeviceStatus extends IResponseDefault {
  data: IDeviceStatusCardProps[];
}

export interface IDeviceInfo {
  sn: number;
  install_location: string;
  install_address_1: string;
  install_address_2: string;
  install_zipcode: string;
  device_name: string;
}

export interface IDeviceSearch extends IResponseDefault {
  data: {
    sn: number;
    serial_number: string;
    install_location: string;
    install_address_1: string;
    install_address_2: string;
    install_zipcode: string;
    device_name: string;
    reg_status: string;
  };
}

export interface IDeviceChartResponse extends IResponseDefault {
  data: IDeviceChartList[];
}

export interface IDeviceChartList {
  device_sn: number;
  device_name: string;
  measure_count: number;
}
