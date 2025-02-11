import { createContext, useContext, useEffect } from "react";
import { useBranches } from "../../apiHooks/useBranches";
import { useCountries } from "../../apiHooks/useCountries";
import { useRoles } from "../../apiHooks/useRoles";
import { useStatuses } from "../../apiHooks/useStatuses";
import { useUsers } from "../../apiHooks/useUsers";

const ApiContext = createContext();

function ApiProvider({ children }) {
  const branchConfigs = useBranches();
  const countryConfigs = useCountries();
  const roleConfigs = useRoles();
  const statusConfigs = useStatuses();
  const usersConfigs = useUsers()

  useEffect(() => {
    console.log("users:", branchConfigs);
  }, [statusConfigs]); 


  return (
    <ApiContext.Provider
      value={{ branchConfigs, countryConfigs, roleConfigs, statusConfigs , usersConfigs }}
    >
      {children}
    </ApiContext.Provider>
  );
}

function useApi() {
  const context = useContext(ApiContext);

  if (context === undefined)
    throw new Error("Context using outside the provider");

  return context;
}

export { useApi, ApiProvider };