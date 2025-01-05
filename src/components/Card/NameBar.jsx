import whatsapp from "../../assets/Icons/whatsapp.png";

export default function NameBar({ info }) {
  return (
    <div className="name-bar">
      <div className="name-bar-img">
        <img src={info.img} alt={info.name} />
      </div>
      <div className="name-bar-name name-small">
        <div>{info.name}</div>
        <div className="name-bar-name-whatsapp">
          <img src={whatsapp} alt={info.title} className="icon" />
          <span className="card-number">{info.number}</span>
        </div>
      </div>
    </div>
  );
}
