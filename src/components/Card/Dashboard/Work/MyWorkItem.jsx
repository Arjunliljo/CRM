import HomeIcon from "../../../utils/Icons/HomeIcon";
import Mover from "../../../../features/Mover";

export default function MyWorkItem({ index, item }) {
  return (
    <div key={index} className={`work-item ${item.color}`}>
      <div className="work-item-content">
        <div className="work-item-content-top">
          <div className="work-item-content-top-left">
            <div className="message-item__avatar">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
                alt=" user"
              />
            </div>
            <div className="work-item-content-name-container">
              <h2>{item.name}</h2>
              <span className="work-item-content-sm-bold">{item.id}</span>
            </div>
          </div>
          <HomeIcon
            path="message"
            color="#9a9e9a"
            style={{ transform: "rotate(270deg)" }}
          />
        </div>
        {/* <div className="work-item-content-bottom"> */}
        <span className="work-item-content-program">{item.program}</span>
        <div>
          {" "}
          <Mover num={item.num} />
        </div>
        <div className="work-item-footer">
          <span className="work-item-content-sm-bold">{item.status}</span>

          <span className="work-item-footer-date">
            {item.date}
            <p>at {item.time}</p>
          </span>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
