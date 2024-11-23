import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { IUser } from "../types/types";
import {
  deleteUser,
  getAllUsers,
  getUser,
  getUserById,
  updateUserById,
} from "../services/user";

// Custom hook to get user data
export const useUser = (): UseQueryResult<Required<IUser>> => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
};

// Custom hook to update user data by userID
export const useUpdateUser = () => {
  return useMutation({
    mutationFn: ({ userID, userData }: { userID: number; userData: any }) =>
      updateUserById(userID, userData),
  });
};

export const useUserById = (userID: number): UseQueryResult<Required<any>> => {
  return useQuery({
    queryKey: ["user", userID],
    queryFn: () => getUserById(userID), // Fetch user by ID
    enabled: !!userID, // Only fetch if userID is provided
  });
};
// Custom hook to delete a user
export const useDeleteUser = () => {
  return useMutation({
    mutationFn: deleteUser,
  });
};

// Custom hook to get all users
export const useAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
};
