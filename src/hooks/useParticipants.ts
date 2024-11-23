import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getAllContestParticipant,
  removeParticipant,
} from "../services/participant";

export const useGetAllParticipants = (
  contestID: string
): UseQueryResult<any> => {
  return useQuery({
    queryKey: ["applicants", contestID], // Cache key for a specific contest based on its ID
    queryFn: () => getAllContestParticipant(contestID), // Fetch function to get a contest by ID
    enabled: !!contestID, // Only run the query if the ID is provided
  });
};

export const useRemoveParticipant = () => {
  return useMutation({
    mutationFn: (participantId: string) => removeParticipant(participantId),
  });
};
