import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPageData, fetchPageData } from "../services/generalSettings";
import { IReqInfoPage } from "../types/types";
import axiosInstance from "../services/axiosInstance";

export const useGetPageData = (page: string) => {
  return useQuery({
    queryKey: ["pageData", page],
    queryFn: () => fetchPageData(page),
    enabled: !!page, // Prevents query from running if page is falsy
  });
};

export const useCreatePageData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPageData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pageData"] }); // Use queryKey correctly
    },
  });
};

// Update page data
const updatePageData = async ({
  page,
  newData,
}: {
  page: string;
  newData: Partial<IReqInfoPage>;
}) => {
  const { data } = await axiosInstance.put(`/api/settings/${page}`, newData);
  return data;
};

export const useUpdatePageData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePageData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pageData"] });
    },
  });
};

// Delete page data
const deletePageData = async (page: string) => {
  const { data } = await axiosInstance.delete(`/api/settings/${page}`);
  return data;
};

export const useDeletePageData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePageData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pageData"] });
    },
  });
};
