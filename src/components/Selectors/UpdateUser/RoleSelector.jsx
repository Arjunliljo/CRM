import { useDispatch } from "react-redux";
import { useApi } from "../../../context/apiContext/ApiContext";
import SmallLoader from "../../../features/SmallLoader";

export default function RoleSelector({ setter }) {
  const dispatch = useDispatch();

  const {
    roleConfigs: { roles },
  } = useApi();

  if (!roles) return <SmallLoader />;

  const handleChange = (event) => {
    const selectedRole = roles.find((role) => role.name === event.target.value);
    if (selectedRole) {
      dispatch(setter({ id: selectedRole._id, name: selectedRole.name }));
    }
  };

  return (
    <div className="form-group">
      <select className="forms-select" onChange={handleChange}>
        <option value="">Select Role</option>
        {roles?.map((role, i) => (
          <option key={i} value={role.name}>
            {role.name}
          </option>
        ))}
      </select>
    </div>
  );
}
