import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../../../config/axiosInstance";
import queryClient from "../../../../../config/reactQuery";

export const useCourses = (curCountryId, curUniversityId) => {
  let endpoint = "/university?";

  if (!curCountryId?.startsWith("All")) {
    endpoint += `country=${curCountryId}&`;
  }
  if (!curUniversityId?.startsWith("All")) {
    endpoint += `_id=${curUniversityId}&`;
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["courses", endpoint],
    queryFn: () => apiClient.get(endpoint),
  });

  const courses =
    data?.data?.data?.reduce((acc, univ) => {
      if (!univ?.courses) return acc;
      return [
        ...acc,
        ...univ.courses.map((course) => ({
          ...course,
          country: univ.country,
        })),
      ];
    }, []) || [];

  return { courses, isLoading, error, refetch };
};

export function refetchCourses() {
  queryClient.invalidateQueries({ queryKey: ["courses"] });
}
