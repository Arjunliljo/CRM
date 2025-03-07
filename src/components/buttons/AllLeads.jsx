function AllLeads({ style, text = "All Leads", value = 19 }) {
  return (
    <button style={style} className="btn btn-auto">
      <span style={{ marginLeft: "1rem" }}>{text}</span>
      <span className="btn-on">{value}</span>
    </button>
  );
}

export default AllLeads;
