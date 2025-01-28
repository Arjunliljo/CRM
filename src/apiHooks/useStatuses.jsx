import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";
import { setStatusNames } from "../../global/coreSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setStatuses } from "../../global/statusSlice";

export const useStatuses = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => apiClient.get("/status"),
  });

  const statuses = data?.data?.data;

  useEffect(() => {
    if (!statuses) return;
    dispatch(setStatusNames(statuses.map((status) => status.name)));
    dispatch(setStatuses(statuses));
  }, [statuses, dispatch]);

  return { statuses, isLoading, error, refetch };
};

export function refetchStatuses() {
  queryClient.invalidateQueries({ queryKey: ["statuses"] });
}
