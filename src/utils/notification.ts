import { notification } from "antd";

export const showError = (message: string, description?: string): void => {
  notification.error({
    message: message || "Error",
    description: description || "Something went wrong, please try again later.",
    placement: "topRight", // Customize where the notification appears
    duration: 3, // Duration in seconds
  });
};

export const showInfo = (message: string, description?: string): void => {
  notification.info({
    message: message || "Information",
    description: description || "Here is some information for you.",
    placement: "topRight", // Customize where the notification appears
    duration: 3, // Duration in seconds
  });
};

export const showSuccess = (message: string, description?: string): void => {
  notification.success({
    message: message || "Success",
    description: description || "Your operation was successful!",
    placement: "topRight", // Customize where the notification appears
    duration: 3, // Duration in seconds
  });
};
