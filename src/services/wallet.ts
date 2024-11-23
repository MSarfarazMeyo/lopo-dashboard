import axiosInstance from "./axiosInstance";

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

// Function to check transaction and add credits to wallet
export const checkTransactionAndAddCredits = async (session_id?: string) => {
  const { data } = await axiosInstance.post(`/api/wallet/add-credits`, {
    session_id,
  });
  return data;
};
