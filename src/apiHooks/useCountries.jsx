import apiClient from "../../config/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import queryClient from "../../config/reactQuery";
import { setCountryNames } from "../../global/coreSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const useCountries = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["countries"],
    queryFn: () => apiClient.get("/country"),
  });

  const countries = data?.data?.data;
  console.log(countries, "countries");

  useEffect(() => {
    if (!countries) return;
    dispatch(setCountryNames(countries.map((country) => country.name)));
  }, [countries, dispatch]);

  return { countries, isLoading, error, refetch };
};

export function refetchCountries() {
  queryClient.invalidateQueries({ queryKey: ["countries"] });
}
