import axiosInstance from "./axiosInstance";
import { IReqInfoPage, IResInfoPage } from "../types/types";

// Fetch page data
export const fetchPageData = async (page: string): Promise<IResInfoPage> => {
  const { data } = await axiosInstance.get(`/api/settings/${page}`);
  return data;
};

// Create page data
export const createPageData = async (newData: IReqInfoPage) => {
  const { data } = await axiosInstance.post("/api/settings", newData);
  return data;
};

// Delete page data
export const deletePageData = async (page: string) => {
  const { data } = await axiosInstance.delete(`/api/settings/${page}`);
  return data;
};
