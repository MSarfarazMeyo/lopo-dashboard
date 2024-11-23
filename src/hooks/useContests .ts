import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getAllContests,
  createNewContest,
  updateContest,
  deleteContest,
  removeParticipant,
  getContestByAlias,
  getAllContestApplicants,
} from "../services/contests";
import { IContest } from "../types/types";

export const useContestByAlias = (alias: string): UseQueryResult<IContest> => {
  return useQuery({
    queryKey: ["contest", alias], // Cache key for a specific contest based on its ID
    queryFn: () => getContestByAlias(alias), // Fetch function to get a contest by ID
    enabled: !!alias, // Only run the query if the ID is provided
  });
};

export const useGetContests = (
  searchTerm: string,
  filters: Record<string, string>
): UseQueryResult<IContest[]> => {
  return useQuery({
    queryKey: ["all-contests", searchTerm, filters],
    queryFn: () => getAllContests(searchTerm, filters),
  });
};

/**
 * Create a new contest.
 */
export const useCreateContest = () => {
  return useMutation({
    mutationFn: createNewContest,
  });
};

/**
 * Update a contest with the given id and data.
 */
export const useUpdateContest = () => {
  return useMutation({
    mutationFn: (data: { id: string; contestData: Partial<IContest> }) =>
      updateContest(data.id, data.contestData),
  });
};

/**
 * Delete a contest by its ID.
 */
export const useDeleteContest = () => {
  return useMutation({
    mutationFn: (id: string) => deleteContest(id),
  });
};
