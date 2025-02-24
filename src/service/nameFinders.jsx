export const getStatusName = (status, statuses) => {
  if (!status || !statuses) return null;

  const statusName = statuses?.find((obj) => obj._id === status)?.name;
  return statusName;
};
export const getCountryName = (country, countries) => {
  if (!country || !countries) return null;

  const countryName = countries?.find((obj) => obj._id === country)?.name;
  return countryName;
};
