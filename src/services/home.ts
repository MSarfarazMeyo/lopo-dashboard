import { IContest } from "../types/types";
import axiosInstance from "./axiosInstance";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getHomeData = async () => {
  const { data } = await axiosInstance.get("api/home");
  return data;
};

export const useGetHomeData = (): UseQueryResult<IContest[]> => {
  return useQuery({
    queryKey: ["homeData"],
    queryFn: getHomeData,
  });
};
