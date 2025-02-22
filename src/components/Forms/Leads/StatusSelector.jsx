function StatusSelector({ statuses }) {
  return (
    <select className="modal__form-input-text-select" placeholder="Status">
      {statuses.map((status) => (
        <option key={status._id} value={status.name}>
          {status.name}
        </option>
      ))}
    </select>
  );
}

export default StatusSelector;
