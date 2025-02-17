import { createContext, useContext, useEffect } from "react";
import { useBranches } from "../../apiHooks/useBranches";
import { useCountries } from "../../apiHooks/useCountries";
import { useRoles } from "../../apiHooks/useRoles";
import { useStatuses } from "../../apiHooks/useStatuses";
import { useUsers } from "../../apiHooks/useUsers";
import { useChats } from "../../apiHooks/useChats";


const ApiContext = createContext();

function ApiProvider({ children }) {
  const branchConfigs = useBranches();
  const countryConfigs = useCountries();
  const roleConfigs = useRoles();
  const statusConfigs = useStatuses();
  const usersConfigs = useUsers();
  const chatsConfigs = useChats();

  console.log(roleConfigs, "role configs");

  useEffect(() => {}, [statusConfigs]);

  return (
    <ApiContext.Provider
      value={{
        branchConfigs,
        countryConfigs,
        roleConfigs,
        statusConfigs,
        usersConfigs,
        chatsConfigs,
      }}
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
