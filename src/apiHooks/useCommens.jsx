import { useQuery } from "@tanstack/react-query";
import apiClient from "../../config/axiosInstance";

export const useCommens = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["commens"],
    queryFn: () => apiClient.get("/general"),
  });

  const commons = data?.data?.data;
  return { commons, isLoading, error, refetch };
};
