import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { ITransaction, TransactionType } from "../types/types";

// Fetch transactions by type
const getTransactions = async (type: TransactionType) => {
  const { data } = await axiosInstance.get(`/api/transactions?type=${type}`);
  return data;
};

// Create a new transaction
const createTransaction = async (newData: ITransaction) => {
  const { data } = await axiosInstance.post("/api/transactions", newData);
  return data;
};

// Custom hook for fetching user transactions
export const useUserTransactions = (
  type: TransactionType,
): UseQueryResult<ITransaction[]> => {
  return useQuery({
    queryKey: ["userTransactions", type], // Use dynamic query key to include type
    queryFn: () => getTransactions(type),
  });
};

// Custom hook for creating a new transaction
export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: createTransaction, // Define the mutation function
    onSuccess: (data) => {
      console.log("Transaction created successfully", data);
    },
    onError: (error) => {
      console.log("Failed to create transaction", error);
    },
  });
};
