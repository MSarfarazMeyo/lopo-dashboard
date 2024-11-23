import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { AxiosProgressEvent } from "axios";

// Function to upload file to S3
export const uploadFileToS3 = async (
  formData: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) => {
  const { data } = await axiosInstance.post("/api/s3/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });

  return data;
};
