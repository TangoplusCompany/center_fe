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

export interface IDeviceStatus {
  status: number;
  success: boolean;
  message: string[];
  data: IDeviceStatusCardProps[];
}

export interface IDeviceInfo {
  sn: number;
  device_name: string;
  install_zipcode: string;
  install_address_1: string;
  install_address_2: string;
  install_location: string;
}

export interface IDeviceSearch {
  status: number;
  success: boolean;
  message: string[];
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

export interface IDeviceChartResponse {
  status: number;
  success: boolean;
  message: string[];
  data: IDeviceChartList[];
}

export interface IDeviceChartList {
  device_sn: number;
  device_name: string;
  measure_count: number;
}
