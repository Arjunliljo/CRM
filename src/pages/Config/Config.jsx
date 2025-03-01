import { useState } from "react";
import ConfigForm from "./ConfigForm";
import ConfigNames from "./ConfigNames";

export default function Config() {
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [configs, setConfigs] = useState([]);

  const handleConfigSelect = (config) => {
    setSelectedConfig(config);
  };

  const handleCloseForm = () => {
    setSelectedConfig(null);
  };

  const handleConfigSubmit = (newConfig) => {
    if (selectedConfig) {
      // Edit existing config
      setConfigs(prevConfigs =>
        prevConfigs.map(config =>
          config.id === selectedConfig.id ? { ...newConfig, id: config.id } : config
        )
      );
    } else {
      // Add new config
      setConfigs(prevConfigs => [
        ...prevConfigs,
        { ...newConfig, id: Date.now() } // Using timestamp as a simple unique id
      ]);
    }
    setSelectedConfig(null);
  };

  return (
    <div className="profileUpdate-main">
      <div className="profile-edit-container dependancies-holder">
        <div className="dependancies-content">
          <ConfigForm
            isEditing={!!selectedConfig}
            initialData={selectedConfig}
            onClose={handleCloseForm}
            onSubmit={handleConfigSubmit}
          />
        </div>
        <div className="dependancies-content">
          <ConfigNames
            configs={configs}
            onEditConfig={handleConfigSelect}
          />
        </div>
      </div>
    </div>
  );
}