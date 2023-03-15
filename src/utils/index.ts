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

export function handleFirebaseError(error: any) {
  const errorCodeMessages: any = {
    "auth/invalid-email": "This email is invalid.",
    "auth/user-disabled": "This user is disabled.",
    "auth/user-not-found": "User not found.",
    "auth/wrong-password": "The password is incorrect.",
    "auth/email-already-in-use": "This email is already in use.",
    "auth/weak-password": "Password should be at least 6 characters",
    "auth/operation-not-allowed":
      "Unexpected error. Please contact the maintainer to resolve this issue.",
    "auth/account-exists-with-different-credential":
      "An account with this email address exists with a different signup method",
    "auth/cancelled-popup-request": "A pop-up window is already open.",
    "auth/popup-blocked":
      "Pop-up is blocked by the browser, please review site settings and try again.",
    "auth/popup-closed-by-user": "Pop-up closed without signing in.",
    "auth/unauthorized-domain":
      "This domain is not authorrized. Please contact the maintainer.",
    "auth/too-many-requests":
      "Too many requests. Please try logging after some time.",
    "auth/network-request-failed": "Please check your internet connection.",
    "auth/app-deleted": "Firechat has been deleted from Firebase.",
  };

  let errorMessage = error.message;
  let errorCode = error.code;
  if (Object.keys(errorCodeMessages).includes(errorCode)) {
    showAlert(errorCodeMessages[errorCode], AlertType.error);
  } else {
    showAlert(errorMessage, AlertType.error);
  }
}

export function getMessageTime(utcDate: Date) {
  // const utcDate = message.date.toDate();
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    hourCycle: "h12",
  })
    .format(utcDate)
    .toLowerCase();
}

export function getMessageDate(utcDate: Date) {
  return new Intl.DateTimeFormat("default", {
    day: "2-digit",
    month: "short",
  }).format(utcDate);
}
