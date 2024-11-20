import { IWallet } from "../types/types";
import axiosInstance from "./axiosInstance";
import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";

// Function to get wallet data
export const getWallet = async () => {
  const { data } = await axiosInstance.get("/api/wallet");
  return data;
};

// Function to add funds to wallet
export const addFunds = async (amount: number) => {
  const { data } = await axiosInstance.post("/api/wallet/add-funds", {
    amount,
  });
  return data;
};

// Function to update wallet data
export const updateWallet = async (walletData: unknown) => {
  const { data } = await axiosInstance.put("/api/wallet", walletData);
  return data;
};

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

// Function to check transaction and add credits to wallet
export const checkTransactionAndAddCredits = async (session_id?: string) => {
  const { data } = await axiosInstance.post(`/api/wallet/add-credits`, {
    session_id,
  });
  return data;
};

// Custom hook to add credits based on transaction session_id
export const useAddCredits = (session_id?: string, onSuccess?: () => void) => {
  return useQuery({
    queryKey: ["wallet", session_id],
    queryFn: () => checkTransactionAndAddCredits(session_id),
    enabled: !!session_id, // Query will only run if session_id is provided
  });
};
