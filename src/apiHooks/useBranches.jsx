import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";

export const useBranches = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["branches"],
    queryFn: () => apiClient.get("/branch"),
  });

  const branches = data?.data?.data;

  return { branches, isLoading, error, refetch };
};

export function refetchBranches() {
  queryClient.invalidateQueries({ queryKey: ["branches"] });
}
