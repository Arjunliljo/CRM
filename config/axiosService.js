import axiosInstance from "./axiosInstance";

const createRole = (data) => {
  return axiosInstance.post(`/role`, data);
};

const createBranch = (data) => {
  return axiosInstance.post(`/branch`, data);
};
export { createRole, createBranch };
