import { createContext, useContext } from "react";
import { useBranches } from "../../apiHooks/useBranches";
import { useCountries } from "../../apiHooks/useCountries";
import { useLeads } from "../../apiHooks/useLeads";

const ApiContext = createContext();

function ApiProvider({ children }) {
  const branchConfigs = useBranches();
  const countryConfigs = useCountries();
  const leadsConfigs = useLeads();

  return (
    <ApiContext.Provider
      value={{ branchConfigs, countryConfigs, leadsConfigs }}
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
