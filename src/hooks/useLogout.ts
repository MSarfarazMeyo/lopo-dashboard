import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

export const handleGoogleLogin = () => {
  window.location.href = `${process.env.REACT_APP_API_BASE_URL}/api/auth/google`;
};

export const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => axiosInstance.get("/api/auth/logout"),
    onSuccess: () => {
      navigate("/"); // Redirect to home or login page
    },
    onError: (error: any) => {
      console.error("Logout failed:", error);
    },
  });
};
