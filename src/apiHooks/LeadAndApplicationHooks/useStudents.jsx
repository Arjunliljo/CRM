import apiClient from "../../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../../config/reactQuery";
import { useSelector } from "react-redux";
import {
  getBranchId,
  getCountryId,
  getStatusId,
  getUserId,
} from "../../service/IdFinders";

export const useStudents = (statuses, branches, countries, users) => {
  const { curStatus, curCountry, curBranch, curCampaign, curRole, curUser } =
    useSelector((state) => state.students);

  const statusId = getStatusId(curStatus, statuses);
  const branchId = getBranchId(curBranch, branches);
  const countryId = getCountryId(curCountry, countries);
  const userId = getUserId(curUser, users);

  let endpoint = `/lead?isStudent=true&limit=1000`;

  if (!curStatus.startsWith("All") && statusId) {
    endpoint += `&status=${statusId}`;
  }

  if (!curCountry.startsWith("All") && countryId) {
    endpoint += `&country=${countryId}`;
  }

  if (!curBranch.startsWith("All") && branchId) {
    endpoint += `&branch=${branchId}`;
  }
  if (!curCampaign.startsWith("All") && curCampaign) {
    endpoint += `&campaignName=${curCampaign}`;
  }

  // if (!curRole.startsWith("All") && curRole) {
  //   endpoint += `&role=${curRole}`;
  // }

  if (!curUser.startsWith("All") && userId) {
    endpoint += `&user=${userId}`;
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
