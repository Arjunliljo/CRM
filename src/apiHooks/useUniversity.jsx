import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";

export const useUniversity = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["university"],
    queryFn: () => apiClient.get("/university"),
  });

  const university = data?.data?.data;

    console.log(university, "ooooo");

  return { university, isLoading, error, refetch };
};

export function refetchUniversity() {
  queryClient.invalidateQueries({ queryKey: ["university"] });
}