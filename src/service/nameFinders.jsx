export const getStatusName = (status, statuses) => {
  if (!status || !statuses) return null;

  const statusName = statuses?.find((obj) => obj._id === status)?.name;
  return statusName;
};
export const getRoleName = (role, roles) => {
  if (!role || !roles) return null;

  const roleName = roles?.find((obj) => obj._id === role)?.name;
  return roleName;
};
export const getCountryName = (country, countries) => {
  if (!country || !countries) return null;

  const countryName = countries?.find((obj) => obj._id === country)?.name;
  return countryName;
};
export const getBranchName = (branch, branches) => {
  if (!branch || !branches) return null;

  const branchName = branches?.find((obj) => obj._id === branch)?.name;
  return branchName;
};
export const getUniversityName = (university, universities) => {
  if (!university || !universities) return null;

  const universityName = universities?.find(
    (obj) => obj._id === university
  )?.name;
  return universityName;
};
