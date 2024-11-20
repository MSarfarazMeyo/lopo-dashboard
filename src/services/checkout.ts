import axiosInstance from "./axiosInstance";
import { useMutation } from "@tanstack/react-query";

export const createCheckoutSession = async (productKey: string) => {
  const { data } = await axiosInstance.post("/api/payments/checkout", {
    productKey,
  });
  return data;
};


export const useCheckoutSession = () => {
  return useMutation({
    mutationFn: createCheckoutSession,
  });
};
