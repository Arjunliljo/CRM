import ConfigItem from "./ConfigItem";

export default function ConfigNames({ configs, onEditConfig }) {
  return (
    <div className="dependancies">
      <div className="dependancies-branch-names">
        <div className="dependancies-branch-names-left">
          {configs?.map((config, i) => (
            <ConfigItem
              key={config.id}
              item={config}
              onEdit={onEditConfig}
            />
          ))}
          {configs.length === 0 && (
            <div className="no-configs">No configurations added yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
