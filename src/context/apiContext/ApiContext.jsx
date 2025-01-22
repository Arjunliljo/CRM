import { createContext, useContext } from "react";
import { useBranches } from "../../apiHooks/useBranches";

const ApiContext = createContext();

function ApiProvider({ children }) {
  const branchConfigs = useBranches();

  return (
    <ApiContext.Provider value={{ branchConfigs }}>
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
