import { IUser } from "../types/types";
import axiosInstance from "./axiosInstance";
import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";

// Function to get user data
export const getUser = async () => {
  const { data } = await axiosInstance.get("/api/users");
  return data;
};

// Function to update user data
export const updateUser = async (userData: unknown) => {
  const { data } = await axiosInstance.put("/api/users", userData);
  return data;
};

// Function to delete a user
export const deleteUser = async (userID: number) => {
  const { data } = await axiosInstance.delete(`/api/users/${userID}`);
  return data;
};

// Custom hook to get user data
export const useUser = (): UseQueryResult<Required<IUser>> => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

// Custom hook to update user data
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};

// Custom hook to delete a user
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
  });
};
