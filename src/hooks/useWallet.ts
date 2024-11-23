import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { IWallet } from "../types/types";
import {
  addFunds,
  checkTransactionAndAddCredits,
  getWallet,
  updateWallet,
} from "../services/wallet";

// Custom hook to get wallet data
export const useWallet = (): UseQueryResult<IWallet> => {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: getWallet,
  });
};

// Custom hook to add funds to wallet
export const useAddFunds = () => {
  return useMutation({
    mutationFn: addFunds,
  });
};

// Custom hook to update wallet data
export const useUpdateWallet = () => {
  return useMutation({
    mutationFn: updateWallet,
  });
};

// Custom hook to add credits based on transaction session_id
export const useAddCredits = (session_id?: string, onSuccess?: () => void) => {
  return useQuery({
    queryKey: ["wallet", session_id],
    queryFn: () => checkTransactionAndAddCredits(session_id),
    enabled: !!session_id, // Query will only run if session_id is provided
  });
};
