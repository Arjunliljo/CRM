import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";

export const useLeads = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["leads"],
    queryFn: () => apiClient.get("/lead"),
  });

  const leads = data?.data?.data;

  console.log(leads, "ooooo");

  return { leads, isLoading, error, refetch };
};

export function refetchLeads() {
  queryClient.invalidateQueries({ queryKey: ["leads"] });
}
