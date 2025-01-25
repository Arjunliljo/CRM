import { useState } from "react";
import StatusItem from "./StatusItem";
import { Delete, EditOutlined } from "@mui/icons-material";

export default function StatusNames({ setNewBranch }) {
  const branchConfigs = {
    branches: [
      {
        id: 1,
        name: "Main Branch",
        status: "Active",
        subStatuses: ["Sub1", "Sub2"],
      },
      {
        id: 2,
        name: "Development Branch",
        status: "Active",
        subStatuses: ["Sub3", "Sub4"],
      },
      {
        id: 3,
        name: "Feature Branch 1",
        status: "Inactive",
        subStatuses: ["Sub5", "Sub6"],
      },
      {
        id: 4,
        name: "Bugfix Branch",
        status: "Active",
        subStatuses: ["Sub7", "Sub8"],
      },
    ],
  };

  // State to track the selected branch
  const [selectedBranch, setSelectedBranch] = useState(null);

  return (
    <div className="dependancies">
      <div className="dependancies-branch-names">
        <div className="dependancies-branch-names-left">
          {branchConfigs?.branches?.map((val, i) => (
            <div key={i} onClick={() => setSelectedBranch(val)}>
              <StatusItem item={val} setNewBranch={setNewBranch} />
            </div>
          ))}
        </div>
        <div className="dependancies-branch-names-left">
          {selectedBranch ? (
            <>
              {selectedBranch.subStatuses.map((subStatus, index) => (
                  <div  key={index} className="branch-item">
                    <div>{subStatus}</div>
                    <div className="branch-item-actions">
                      <EditOutlined
                        sx={{ color: "darkblue", fontSize: "1.2rem" }}
                      />
                      <Delete sx={{ color: "darkblue", fontSize: "1.2rem" }} />
                    </div>
                  </div>
              ))}
            </>
          ) : (
            <span className="dependancies-branch-names-left-warning">Select a status to view substatuses</span>
          )}
        </div>
      </div>
    </div>
  );
}
