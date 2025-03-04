import { createContext, useContext } from "react";
import { useBranches } from "../../apiHooks/useBranches";
import { useCountries } from "../../apiHooks/useCountries";
import { useRoles } from "../../apiHooks/useRoles";
import { useStatuses } from "../../apiHooks/useStatuses";
import { useUsers } from "../../apiHooks/useUsers";
import { useChats } from "../../apiHooks/useChats";
import { useLeads } from "../../apiHooks/LeadAndApplicationHooks/useLeads";
import { useCommens } from "../../apiHooks/useCommens";
import { useUniversity } from "../../apiHooks/useUniversity";
import { useQualifications } from "../../apiHooks/useQualifications";
import { useCampaigns } from "../../apiHooks/useCampaigns";
import { useStudents } from "../../apiHooks/LeadAndApplicationHooks/useStudents";

const ApiContext = createContext();

function ApiProvider({ children }) {
  const branchConfigs = useBranches();
  const countryConfigs = useCountries();
  const roleConfigs = useRoles();
  const statusConfigs = useStatuses();
  const usersConfigs = useUsers();
  const chatsConfigs = useChats();

  const commonsConfigs = useCommens();
  const campaignsConfigs = useCampaigns();

  const universityConfigs = useUniversity(countryConfigs?.countries);
  const qualificationsConfigs = useQualifications();

  const leadsConfigs = useLeads(
    statusConfigs?.statuses,
    branchConfigs?.branches,
    countryConfigs?.countries,
    usersConfigs?.users
  );
  const studentsConfigs = useStudents(
    statusConfigs?.statuses,
    branchConfigs?.branches,
    countryConfigs?.countries,
    usersConfigs?.users
  );

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
        studentsConfigs,
        commonsConfigs,
        universityConfigs,
        qualificationsConfigs,
        campaignsConfigs,
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
