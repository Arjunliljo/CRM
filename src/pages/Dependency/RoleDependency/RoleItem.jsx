import { EditOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setRoleEdit } from "../../../../global/creationSlice";

export default function RoleItem({ item }) {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setRoleEdit({ isRoleEdit: true, editRole: item }));
  };

  return (
    <div className="branch-item">
      <div>{item.name}</div>
      <div className="branch-item-actions">
        <EditOutlined
          sx={{ color: "darkblue", fontSize: "1.2rem" }}
          onClick={handleEdit}
        />
      </div>
    </div>
  );
}
