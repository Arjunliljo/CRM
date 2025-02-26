import { useQuery } from "@tanstack/react-query";
import apiClient from "../../config/axiosInstance";
import queryClient from "../../config/reactQuery";
import { useSelector } from "react-redux";

export const useCampaigns = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => apiClient.get("/meta_lead/campaigns_db?limit=100"),
  });

  const campaigns = data?.data?.data;

  return { campaigns, isLoading, error, refetch };
};

export function refetchCampaigns() {
  queryClient.invalidateQueries({ queryKey: ["campaigns"] });
}
