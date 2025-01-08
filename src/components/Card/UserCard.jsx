import { useEffect, useRef, useState } from "react";
import Mover from "../../features/Mover";
import CountryBtn from "../buttons/CountryBtn";
import InfoBtn from "../buttons/InfoBtn";
import HomeIcon from "../utils/Icons/HomeIcon";
import NameBar from "./NameBar";
import { useDispatch } from "react-redux";

function UserCard({ user, set, onSet }) {
  const [isSelected, setIsSelected] = useState(user?._id === set?._id);
  const targetRef = useRef(null);

  useEffect(() => {
    setIsSelected(user?._id === set?._id);
  }, [set, user]);

  const dispatch = useDispatch();
  const handleUserSelect = () => {
    dispatch(onSet(user));
    setTimeout(() => {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 500);
  };

  return (
    <div
      className={`card ${isSelected ? "selectedCard" : ""}`}
      onClick={handleUserSelect}
      id={`${user?._id}`}
      ref={targetRef}
    >
      <div className="card-body">
        <div className="card-body-top">
          <NameBar lead={user} />
          {/* <InfoBtn color="white" bgcl="green">
            Interested
          </InfoBtn> */}
        </div>

        <div className="card-body-center">
          <div className="card-body-bottom-icons">
            <div className="card-body-bottom-icons-item">
              <HomeIcon
                path="u-turn"
                color="#00b100"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{user.applications}</p>
            </div>
            <div className="card-body-bottom-icons-item">
              <HomeIcon
                path="retry"
                color="#0075fc"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{user.ongoing}</p>
            </div>
          </div>
        </div>

        <div className="card-body-bottom-country">
          <CountryBtn>{user.state}</CountryBtn>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
