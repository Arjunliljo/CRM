import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";
import { useSelector } from "react-redux";
import { getCountryId } from "../service/IdFinders";

export const useUniversity = (countries) => {
  const { curCountry } = useSelector((state) => state.university);

  const countryId = getCountryId(curCountry, countries);
  let endpoint = "/university";

  if (curCountry !== "All" && countryId) {
    endpoint += `?country=${countryId}`;
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["university", endpoint],
    queryFn: () => apiClient.get(endpoint),
  });

  const university = data?.data?.data;

  return { university, isLoading, error, refetch };
};

export function refetchUniversity() {
  queryClient.invalidateQueries({ queryKey: ["university"] });
}
