import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";
import { getCountryId } from "../service/IdFinders";
import { useSelector } from "react-redux";

export const useUniversity = (countries) => {

  const{curCountry}=useSelector((state)=> state.university)
  const countryId = getCountryId(curCountry, countries);
console.log(curCountry ,countryId)
  let endpoint = "/university";

  if (curCountry !== "All" && countryId) {
    endpoint += `?country=${countryId}`;
  }

console.log(endpoint)
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["university", endpoint],
    queryFn: () => apiClient.get(endpoint),
  });

console.log(data)

  const university = data?.data?.data;

  return { university, isLoading, error, refetch };
};

export function refetchUniversity() {
  queryClient.invalidateQueries({ queryKey: ["university"] });
}
