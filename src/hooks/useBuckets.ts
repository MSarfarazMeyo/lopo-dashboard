import { useMutation } from "@tanstack/react-query";
import { createBucket, deleteBucket } from "../services/bucketService";

export const useCreateBucket = () => {
  return useMutation({
    mutationFn: createBucket,
    onError: (error) => {
      console.error("Error creating bucket:", error);
    },
    onSuccess: (data) => {
      // data here should be the response from createBucket, which includes the bucket name
      console.log("Bucket created:", data);
    },
  });
};

/**
 * Hook to delete a bucket
 */
export const useDeleteBucket = () => {
  return useMutation({
    mutationFn: (name: string) => deleteBucket(name),
  });
};
