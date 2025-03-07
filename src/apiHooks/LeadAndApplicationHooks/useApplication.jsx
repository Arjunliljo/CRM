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

export const useApplications = (statuses, branches, countries, users) => {
  const { curStatus, curCountry, curBranch, curCampaign, curRole, curUser } =
    useSelector((state) => state.applications);

  let endpoint = `/application?sort=createdAt&limit=100`;

  const statusId = getStatusId(curStatus, statuses);
  const branchId = getBranchId(curBranch, branches);
  const countryId = getCountryId(curCountry, countries);
  const userId = getUserId(curUser, users);

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

  if (!curUser.startsWith("All") && userId) {
    endpoint += `&user=${userId}`;
  }

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
