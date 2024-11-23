import axiosInstance from "./axiosInstance";

export const getHomeData = async () => {
  const { data } = await axiosInstance.get("api/home");
  return data;
};
