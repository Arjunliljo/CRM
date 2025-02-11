// import apiClient from "../../config/axiosInstance";
// import { useQuery } from "@tanstack/react-query";
// import queryClient from "../../config/reactQuery";
// import { setRoleNames } from "../../global/coreSlice";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";

// export const useUsers = () => {
//   const dispatch = useDispatch();

//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ["users"],
//     queryFn: () => apiClient.get("/user"),
//   });

//   const users = data?.data?.data;

//   useEffect(() => {
//     if (!users) return;
//     dispatch(setRoleNames(users));
//   }, [users, dispatch]);

//   return { users, isLoading, error, refetch };
// };

// export function refetchUsers() {
//   queryClient.invalidateQueries({ queryKey: ["users"] });
// }


import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";
import { setUsers } from "../../global/usersSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const useUsers = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () => apiClient.get("/user"),
  });

  const users = data?.data?.data;
  console.log(users);
  

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