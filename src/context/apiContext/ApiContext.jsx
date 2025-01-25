import { createContext, useContext } from "react";
import { useBranches } from "../../apiHooks/useBranches";
import { useCountries } from "../../apiHooks/useCountries";
import { useLeads } from "../../apiHooks/useLeads";
import { useUniversity } from "../../apiHooks/useUniversity";

const ApiContext = createContext();

function ApiProvider({ children }) {
  const branchConfigs = useBranches();
  const countryConfigs = useCountries();
  const leadsConfigs = useLeads();
  const universityConfigs = useUniversity();

  console.log(leadsConfigs, "///////");

  return (
    <ApiContext.Provider
      value={{ branchConfigs, countryConfigs, leadsConfigs, universityConfigs }}
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
