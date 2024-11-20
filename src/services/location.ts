import axiosInstance from "./axiosInstance";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";

const getAddress = async ({ queryKey }: QueryFunctionContext<string[]>) => {
  const [, place_id] = queryKey;
  const { data } = await axiosInstance.get(`/api/location?place_id=${place_id}`);
  return data;
};

export const useAddress = (place_id: string) => {
  return useQuery({
    queryKey: ["address", place_id],
    queryFn: getAddress,
    enabled: !!place_id, // Ensure the query runs only when place_id is truthy
  });
};
