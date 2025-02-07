export interface DeviceStatusCardProps {
  sn: number;
  serial_number: string;
  install_location: string;
  install_address: string;
  install_address_detail: string;
  install_zipcode: string;
  device_name: string;
  reg_date: Date;
  modify_date: Date;
  upload_date: Date;
  uploaded: string;
  used: string;
  reg_status: string;
}
