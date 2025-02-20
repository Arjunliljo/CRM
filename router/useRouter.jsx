import { useQuery } from "@tanstack/react-query";
import apiClient from "../config/axiosInstance";

export const useRouter = () => {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => apiClient.get("/user"),
  });
};
