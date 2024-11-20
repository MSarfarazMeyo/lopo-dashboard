import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const checkToken = async () => {
  if (!localStorage.getItem("authStatus")) return;

  try {
    const { data } = await axiosInstance.get("/api/users");
    return data;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error("Unauthorized");
    }
    throw error;
  }
};

export const useTokenRefresh = () => {
  const router = useNavigate();

  const { refetch, isError } = useQuery({
    queryKey: ["tokenRefresh"],
    queryFn: checkToken,
    refetchInterval: 10 * 60 * 1000, // Refresh every 10 minutes
    refetchOnWindowFocus: false, // Disable refetching on window focus
    retry: false, // Do not retry on failure
  });

  useEffect(() => {
    if (isError) {
      router("/"); // Redirect to login on error
    }
  }, [isError, router]);

  return { refetch };
};
