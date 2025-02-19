export const getStatusName = (status, statuses) => {
  if (!status || !statuses) return null;

  const statusName = statuses.find((obj) => obj._id === status)?.name;
  return statusName;
};
