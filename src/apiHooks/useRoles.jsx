import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";
import { setRoleNames } from "../../global/coreSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const useRoles = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["roles"],
    queryFn: () => apiClient.get("/role"),
  });

  const roles = data?.data?.data;

  useEffect(() => {
    if (!roles) return;
    dispatch(setRoleNames(roles.map((role) => role.name)));
  }, [roles, dispatch]);

  return { roles, isLoading, error, refetch };
};

export function refetchRoles() {
  queryClient.invalidateQueries({ queryKey: ["roles"] });
}
