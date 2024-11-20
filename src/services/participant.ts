import { useMutation } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

// Register for Contest Mutation Hook
export const useRegisterForContest = () => {
  return useMutation({
    mutationFn: ({ contestID }: { contestID: number }) =>
      axiosInstance.post(`/api/contests/participants/`, {
        contestID,
      }),
  });
};

// Submit Content Mutation Hook
export const useSubmitContent = () => {
  return useMutation({
    mutationFn: ({
      contestID,
      submittedContent,
    }: {
      contestID: number;
      submittedContent: string;
    }) => {
      return axiosInstance.put(
        `/api/contests/participants/${contestID}/submit-content`,
        { contestID, submittedContent },
      );
    },
  });
};
