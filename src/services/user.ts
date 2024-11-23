import { IUser } from "../types/types";
import axiosInstance from "./axiosInstance";
import { useQuery, useMutation, UseQueryResult } from "@tanstack/react-query";

// Function to get user data
export const getUser = async () => {
  const { data } = await axiosInstance.get("/api/users");
  return data;
};

export const getAllUsers = async () => {
  const { data } = await axiosInstance.get("/api/users/all");
  return data;
};

export const getUserById = async (userID: number) => {
  const { data } = await axiosInstance.get(`/api/users/${userID}`);
  return data;
};

// Function to update user data
export const updateUserById = async (userID: number, userData: any) => {
  const { data } = await axiosInstance.put(`/api/users/${userID}`, userData);
  return data;
};

// Function to delete a user
export const deleteUser = async (userID: number) => {
  const { data } = await axiosInstance.delete(`/api/users/${userID}`);
  return data;
};
