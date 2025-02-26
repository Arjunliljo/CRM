import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";
import { useSelector } from "react-redux";
import { getStatusId } from "../service/IdFinders";

export const useStudents = (statuses) => {
  const { curStatus, curSource, curBranch, curCampaign } = useSelector(
    (state) => state.students
  );

  const statusId = getStatusId(curStatus, statuses);

  let endpoint = `/lead?isStudent=true&limit=1000`;

  if (!curStatus.startsWith("All")) {
    endpoint += `&status=${statusId}`;
  }

  if (!curSource.startsWith("All")) {
    endpoint += `&source=${curSource}`;
  }

  if (!curBranch.startsWith("All")) {
    endpoint += `&branch=${curBranch}`;
  }

  if (!curCampaign.startsWith("All")) {
    endpoint += `&campaignName=${curCampaign}`;
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["students", endpoint],
    queryFn: () => apiClient.get(endpoint),
  });

  const students = data?.data?.data;
  return { students, isLoading, error, refetch };
};

export function refetchStudents() {
  queryClient.invalidateQueries({ queryKey: ["students"] });
}
