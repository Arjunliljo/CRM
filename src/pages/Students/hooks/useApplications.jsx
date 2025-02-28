import { useQuery } from "@tanstack/react-query";

import apiClient from "../../../../config/axiosInstance";
import queryClient from "../../../../config/reactQuery";

export const useApplications = (curStudentID) => {
  let endpoint = `/application?lead=${curStudentID}`;

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
