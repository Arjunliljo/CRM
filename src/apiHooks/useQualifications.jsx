import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";

export const useQualifications = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["qualifications"],
    queryFn: () => apiClient.get("/university/course"),
  });

  const qualifications = data?.data?.data;

  return { qualifications, isLoading, error, refetch };
};

export function refetchQualifications() {
  queryClient.invalidateQueries({ queryKey: ["qualifications"] });
}