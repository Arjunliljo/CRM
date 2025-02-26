import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";
import { useSelector } from "react-redux";
import { getBranchId, getCountryId, getStatusId } from "../service/IdFinders";

export const useLeads = (statuses, branches, countries) => {
  const { curStatus, curCountry, curBranch, curCampaign, curRole } =
    useSelector((state) => state.leads);

  const statusId = getStatusId(curStatus, statuses);
  const branchId = getBranchId(curBranch, branches);
  const countryId = getCountryId(curCountry, countries);

  let endpoint = `/lead?sort=createdAt&isStudent=false&limit=100`;

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

  if (!curRole.startsWith("All") && curRole) {
    endpoint += `&role=${curRole}`;
  }

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
