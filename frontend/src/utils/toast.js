import { toast as reactToastify } from "react-toastify";

export const toast = {
  success: (message) => reactToastify.success(message),
  error: (message) => reactToastify.error(message),
};
