import axiosInstance from "./axiosInstance";
import { useMutation } from "@tanstack/react-query";

// Send OTP
export const sendOtp = async (phone: string) => {
  const { data } = await axiosInstance.post("/api/notifications/send-otp", {
    phone,
  });
  return data;
};

// Verify OTP
export const verifyOtp = async ({
  phone,
  otp,
}: {
  phone: string;
  otp: string;
}) => {
  const { data } = await axiosInstance.post("/api/notifications/verify-otp", {
    phone,
    otp,
  });
  return data;
};

// useSendOtp Mutation Hook
export const useSendOtp = () => {
  return useMutation({
    mutationFn: sendOtp,
  });
};

// useVerifyOtp Mutation Hook
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (params: { phone: string; otp: string }) => verifyOtp(params),
  });
};
