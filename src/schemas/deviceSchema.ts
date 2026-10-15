import { z } from "zod";

/**
 * 기기 상세 정보 수정 스키마
 */
export const createDeviceDetailSchema = (t?: (key: string) => string) =>
  z.object({
    device_name: z
      .string()
      .min(1, {
        message: t ? t("device_serial_placeholder") : "Please enter the device name.",
      })
      .max(30, {
        message: t ? t("device_serial_max_30") : "Device name must be 30 characters or less.",
      })
      .regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
        message: t ? t("device_error_bad_request_input") : "Only letters, numbers, spaces, and hyphens are allowed.",
      }),
    install_address_1: z
      .string()
      .min(1, { message: t ? t("device_label_install_address") : "Please enter installation address." })
      .max(60, { message: "Installation address must be 60 characters or less." })
      .regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
        message: "Only letters, numbers, spaces, and hyphens are allowed.",
      }),
    install_address_2: z
      .string()
      .min(1, { message: t ? t("device_label_install_address_detail") : "Please enter detailed installation address." })
      .max(30, { message: "Detailed address must be 30 characters or less." })
      .regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
        message: "Only letters, numbers, spaces, and hyphens are allowed.",
      }),
    install_location: z
      .string()
      .min(1, {
        message: t ? t("device_label_install_location") : "Please enter installation location.",
      })
      .max(30, {
        message: "Installation location must be 30 characters or less.",
      })
      .regex(/^[가-힣a-zA-Z0-9\s-]+$/, {
        message: "Only letters, numbers, spaces, and hyphens are allowed.",
      }),
  });

export const deviceDetailSchema = createDeviceDetailSchema();

export type IDeviceDetailForm = z.infer<typeof deviceDetailSchema>;

/**
 * 기기 검색 스키마
 */
export const createDeviceSearchSchema = () =>
  z.object({
    serial_number: z
      .string()
      .max(50, { message: "Serial number must be 50 characters or less." })
      .regex(/^[a-zA-Z0-9-]+$/, {
        message: "Only English letters, numbers, and hyphens are allowed.",
      }),
  });

export const deviceSearchSchema = createDeviceSearchSchema();

export type IDeviceSearchForm = z.infer<typeof deviceSearchSchema>;