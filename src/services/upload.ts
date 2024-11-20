import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { AxiosProgressEvent } from "axios";

// Function to upload file to S3
const uploadFileToS3 = async (
  formData: FormData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
) => {
  const { data } = await axiosInstance.post("/api/s3/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });

  return data;
};

// Custom hook to handle file upload mutation
export const useUploadFile = () => {
  return useMutation({
    mutationFn: ({
      formData,
      onUploadProgress,
    }: {
      formData: FormData;
      onUploadProgress: (progressEvent: AxiosProgressEvent) => void;
    }) => uploadFileToS3(formData, onUploadProgress),
  });
};
