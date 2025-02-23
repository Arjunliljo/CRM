 function StatusSelector({ statuses, handleChange }) {
  return (
    <select className="modal__form-input-text-select" placeholder="Status" name="status" onChange={handleChange}>
      {statuses?.map((status) => (
        <option key={status._id} value={status._id}>
          {status.name}
        </option>
      ))}
    </select>
  );
}

export default StatusSelector;
