import axiosInstance from "./axiosInstance";
import { IContest, IContestCardProps } from "../types/types";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";

export const getContests = async (filter: string, city: string) => {
  const { data } = await axiosInstance.get("/api/contests/feed", {
    params: { filter, city },
  });
  return data;
};

const getContestByAlias = async (alias: string): Promise<IContest> => {
  const { data } = await axiosInstance.get(`/api/contests/${alias}`);
  return data;
};

const joinContest = async (id: string): Promise<void> => {
  const { data } = await axiosInstance.post(`/api/contests/${id}/join`);
  return data;
};

export const useContests = (
  filter: string,
  city: string,
): UseQueryResult<IContestCardProps[]> => {
  return useQuery({
    queryKey: ["contests", filter, city],
    queryFn: () => getContests(filter, city),
    enabled: !!filter, // Ensures the query runs only if filter is not empty
  });
};

export const useContestByAlias = (alias: string) => {
  return useQuery({
    queryKey: ["contest", alias],
    queryFn: () => getContestByAlias(alias),
  });
};

export const useJoinContest = () => {
  return useMutation({
    mutationFn: joinContest,
  });
};
