import { useMutation } from "@tanstack/react-query";
import { uploadFileToS3 } from "../services/upload";
import { AxiosProgressEvent } from "axios";

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
