import { toast } from "react-toastify";

export enum AlertType {
  info,
  success,
  warning,
  error,
}

export function showAlert(message: string, type?: AlertType) {
  switch (type) {
    case AlertType.info:
      toast.info(message);
      break;
    case AlertType.warning:
      toast.warn(message);
      break;
    case AlertType.error:
      toast.error(message);
      break;
    case AlertType.success:
      toast.success(message);
      break;
    default:
      toast(message);
  }
}
