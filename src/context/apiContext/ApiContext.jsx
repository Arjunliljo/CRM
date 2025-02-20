import { createContext, useContext } from "react";
import { useBranches } from "../../apiHooks/useBranches";
import { useCountries } from "../../apiHooks/useCountries";
import { useRoles } from "../../apiHooks/useRoles";
import { useStatuses } from "../../apiHooks/useStatuses";
import { useUsers } from "../../apiHooks/useUsers";
import { useChats } from "../../apiHooks/useChats";
import { useLeads } from "../../apiHooks/useLeads";
import { useCommens } from "../../apiHooks/useCommens";

const ApiContext = createContext();

function ApiProvider({ children }) {
  const branchConfigs = useBranches();
  const countryConfigs = useCountries();
  const roleConfigs = useRoles();
  const statusConfigs = useStatuses();
  const usersConfigs = useUsers();
  const chatsConfigs = useChats();
  const leadsConfigs = useLeads();
  const commonsConfigs = useCommens();

  return (
    <ApiContext.Provider
      value={{
        branchConfigs,
        countryConfigs,
        roleConfigs,
        statusConfigs,
        usersConfigs,
        chatsConfigs,
        leadsConfigs,
        commonsConfigs,
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
