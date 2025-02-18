import whatsapp from "../../assets/Icons/whatsapp.png";

export default function NameBar({ lead }) {
  return (
    <div className="name-bar">
      <div className="name-bar-img">
        <img src={lead.img} alt={lead.name} />
      </div>
      <div className="name-bar-name name-small">
        <div>{lead.name}</div>
        <div className="name-bar-name-whatsapp">
          <img src={whatsapp} alt={lead.title} className="icon" />
          <span className="card-number">{lead.phone}</span>
        </div>
      </div>
    </div>
  );
}
