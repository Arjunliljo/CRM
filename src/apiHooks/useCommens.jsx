import { useQuery } from "@tanstack/react-query";
import apiClient from "../../config/axiosInstance";
import queryClient from "../../config/reactQuery";

export const useCommens = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["commens"],
    queryFn: () => apiClient.get("/general"),
  });

  const commons = data?.data?.data?.[0];

  return { commons, isLoading, error, refetch };
};

export function refetchCommens() {
  queryClient.invalidateQueries({ queryKey: ["commens"] });
}
