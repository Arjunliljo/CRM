import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../../config/axiosInstance";
import queryClient from "../../../../config/reactQuery";

export const useGeneralLeads = (status) => {
  let endpoint = `/lead?sort=createdAt&limit=100&status=${status?._id}`;

  if (status?.isApplication) {
    endpoint = `/application?sort=createdAt&limit=100&status=${status?._id}`;
  } else {
    endpoint = `/lead?sort=createdAt&limit=100&status=${status?._id}`;
  }

  const {
    data: appOrLeadData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [status?.name, endpoint],
    queryFn: () => apiClient.get(endpoint),
  });

  const data = appOrLeadData?.data?.data;
  return { data, isLoading, error, refetch };
};

export function refetchGeneralLeads(status) {
  queryClient.invalidateQueries({ queryKey: [status?.name] });
}
