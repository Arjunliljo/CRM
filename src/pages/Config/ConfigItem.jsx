import { EditOutlined } from "@mui/icons-material";

export default function ConfigItem({ item, onEdit }) {
  return (
    <div className="branch-item">
      <div className="branch-item-info">
        <div className="branch-item-name">{item.name}</div>
        {/* <div className="branch-item-details">
          <span>Client ID: {item.clientId}</span>
          <span>App ID: {item.appId}</span>
          <span>Account ID: {item.accountId}</span>
        </div> */}
      </div>
      <div className="branch-item-actions">
        <EditOutlined
          sx={{ color: "darkblue", fontSize: "1.2rem" }}
          onClick={() => onEdit(item)}
        />
      </div>
    </div>
  );
}
