import axiosInstance from "./axiosInstance";
import { IContest } from "../types/types";

export const getAllContestParticipant = async (
  contestID: string
): Promise<IContest> => {
  const { data } = await axiosInstance.get(
    `/api/contests/allparticipants/${contestID}`
  );
  return data;
};

// Remove a participant
export const removeParticipant = async (
  participantId: string
): Promise<void> => {
  await axiosInstance.delete(`/api/contests/participants`, {
    data: { participantId },
  });
};
