import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setBranchEdit } from "../../../../global/creationSlice";

export default function BranchItem({ item }) {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setBranchEdit({ isBranchEdit: true, editBranch: item }));
  };

  return (
    <div className="branch-item">
      <div>{item.name}</div>
      <div className="branch-item-actions">
        <EditOutlined
          sx={{ color: "darkblue", fontSize: "1.2rem" }}
          onClick={handleEdit}
        />
        {/* <DeleteOutlined sx={{ color: "darkred", fontSize: "1.2rem" }} /> */}
      </div>
    </div>
  );
}
