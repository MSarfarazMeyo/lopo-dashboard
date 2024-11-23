import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IContest } from "../types/types";
import { getHomeData } from "../services/home";

export const useGetHomeData = (): UseQueryResult<IContest[]> => {
  return useQuery({
    queryKey: ["homeData"],
    queryFn: getHomeData,
  });
};
