import axiosInstance from "./axiosInstance";

export const createBucket = async (bucketData) => {
  const { data } = await axiosInstance.post("/api/bucket", bucketData);
  return data;
};

export const deleteBucket = async (bucketName) => {
  const { data } = await axiosInstance.delete(`/api/bucket/${bucketName}`);
  return data;
};
