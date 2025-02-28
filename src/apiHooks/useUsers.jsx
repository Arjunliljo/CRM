import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";
import { setUsers } from "../../global/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCountryId, getRoleId, getBranchId } from "../service/IdFinders";

export const useUsers = (countries, roles, branches) => {
  const dispatch = useDispatch();
  const { curCountry, curRole, curBranch } = useSelector((state) => state.user);

  const countryId = getCountryId(curCountry, countries);
  const roleId = getRoleId(curRole, roles);
  const branchId = getBranchId(curBranch, branches);
  let endpoint = "/user";

  if (curCountry !== "All" && countryId) {
    endpoint += `?country=${countryId}`;
  }

  if (curRole !== "All" && roleId) {
    endpoint += `&role=${roleId}`;
  }

  if (curBranch !== "All" && branchId) {
    endpoint += `&branch=${branchId}`;
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users", endpoint],
    queryFn: () => apiClient.get(endpoint),
  });

  const users = data?.data?.data;

  useEffect(() => {
    if (users) {
      dispatch(setUsers(users));
    }
  }, [users, dispatch]);

  return { users, isLoading, error, refetch };
};

export function refetchUsers() {
  queryClient.invalidateQueries({ queryKey: ["users"] });
}