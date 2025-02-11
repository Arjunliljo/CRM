import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";
import { setBranchNames } from "../../global/coreSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const useBranches = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["branches"],
    queryFn: () => apiClient.get("/branch"),
  });
  
  const branches = data?.data?.data;
  console.log(branches);
  

  useEffect(() => {
    if (!branches) return;
    dispatch(setBranchNames(branches.map((branch) => branch.name)));
  }, [branches, dispatch]);

  return { branches, isLoading, error, refetch };
};

export function refetchBranches() {
  queryClient.invalidateQueries({ queryKey: ["branches"] });
}
