import axiosInstance from "./axiosInstance";
import { IContest } from "../types/types";

// Fetch all contests -specific)
export const getAllContests = async (
  searchTerm: string = "",
  filters: Record<string, string> = {}
): Promise<IContest[]> => {
  const queryParams = new URLSearchParams({
    search: searchTerm,
    ...filters,
  }).toString();

  const { data } = await axiosInstance.get(`/api/contests?${queryParams}`);
  return data;
};
// Create a new contest
export const createNewContest = async (
  contestData: Partial<IContest>
): Promise<IContest> => {
  const { data } = await axiosInstance.post("/api/contests", contestData);
  return data;
};

// Update a contest
export const updateContest = async (
  id: string,
  contestData: Partial<IContest>
): Promise<IContest> => {
  const { data } = await axiosInstance.put(`/api/contests/${id}`, contestData);
  return data;
};

export const getContestByAlias = async (alias: string): Promise<IContest> => {
  const { data } = await axiosInstance.get(`/api/contests/${alias}`);
  return data;
};

export const getAllContestApplicants = async (
  contestID: string
): Promise<IContest> => {
  const { data } = await axiosInstance.get(
    `/api/contests/allparticipants/${contestID}`
  );
  return data;
};

// Delete a contest
export const deleteContest = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/api/contests/${id}`);
};

// Remove a participant
export const removeParticipant = async (
  participantId: string
): Promise<void> => {
  await axiosInstance.delete(`/api/contests/participants`, {
    data: { participantId },
  });
};
