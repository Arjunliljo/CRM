import apiClient from "../../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../../config/reactQuery";

export const useApplications = () => {
  let endpoint = `/application?sort=createdAt&limit=100`;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["applications", endpoint],
    queryFn: () => apiClient.get(endpoint),
  });

  const applications = data?.data?.data;
  return { applications, isLoading, error, refetch };
};

export function refetchApplications() {
  queryClient.invalidateQueries({ queryKey: ["applications"] });
}
