import { useApi } from "../../../context/apiContext/ApiContext";
import RoleItem from "./RoleItem";

export default function RoleNames({ setNewRole }) {
  const {
    roleConfigs: { isLoading, roles },
  } = useApi();

  return (
    <div className="dependancies">
      <div className="dependancies-branch-names">
        <div className="dependancies-branch-names-left">
          {isLoading ? (
            <div className="btn-bigloader"></div>
          ) : (
            roles?.map((val, i) => (
              <RoleItem key={i} item={val} setNewRole={setNewRole} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
