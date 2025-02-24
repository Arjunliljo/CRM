import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";
import { useSelector } from "react-redux";
import { getStatusId } from "../service/IdFinders";

export const useLeads = (statuses) => {
  const { curStatus, curSource, curBranch } = useSelector(
    (state) => state.leads
  );

  const statusId = getStatusId(curStatus, statuses);
  console.log(statusId, "statusId");

  let endpoint = `/lead?isStudent=false&limit=1000`;

  if (!curStatus.startsWith("All")) {
    endpoint += `&status=${statusId}`;
  }

  if (!curSource.startsWith("All")) {
    endpoint += `&source=${curSource}`;
  }

  if (!curBranch.startsWith("All")) {
    endpoint += `&branch=${curBranch}`;
  }
  console.log(endpoint);
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["leads", endpoint],
    queryFn: () => apiClient.get(endpoint),
  });

  const leads = data?.data?.data;
  return { leads, isLoading, error, refetch };
};

export function refetchLeads() {
  queryClient.invalidateQueries({ queryKey: ["leads"] });
}
