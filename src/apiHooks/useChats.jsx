// import apiClient from "../../config/axiosInstance";
// import { useQuery } from "@tanstack/react-query";
// import queryClient from "../../config/reactQuery";
// import { useSelector , useDispatch } from "react-redux";
// import { setChats } from "../../global/chatSlice";
// import { useEffect } from "react";

// export const useChats = () => {
//   const user = useSelector(state => state.auth.user);
// const dispatch = useDispatch()


//   const { data, isLoading, error, refetch } = useQuery({
//     queryKey: ["chats"],
//     queryFn: () => apiClient.get(`/chat?userId=${user?._id}`),
//   });

//   const chats = data?.data?.data;
// console.log(chats)

//   useEffect(()=>{
//   if(chats){
//     dispatch(setChats(chats))
//   }
// },[chats, dispatch])

//   return { chats, isLoading, error, refetch };
// };

// export function refetchChats() {
//   queryClient.invalidateQueries({ queryKey: ["chats"] });
// }

import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";
import { useSelector, useDispatch } from "react-redux";
import { setChats } from "../../global/chatSlice";
import { useEffect } from "react";

export const useChats = () => {
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["chats"],
    queryFn: () => apiClient.get(`/chat?userId=${user?._id}`),
    // Enable automatic refetching when window regains focus
    refetchOnWindowFocus: true,
    // Keep data fresh
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const chats = data?.data?.data;

  useEffect(() => {
    if (chats) {
      dispatch(setChats(chats));
    }
  }, [chats, dispatch]);

  return { chats, isLoading, error, refetch };
};

export function refetchChats() {
  queryClient.invalidateQueries({ queryKey: ["chats"] });
}