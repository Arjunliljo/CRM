import { useEffect, useRef, useState } from "react";
import Mover from "../../features/Mover";
import CountryBtn from "../buttons/CountryBtn";
import InfoBtn from "../buttons/InfoBtn";
import HomeIcon from "../utils/Icons/HomeIcon";
import { useDispatch, useSelector } from "react-redux";
import UserNamebar from "./UserRight/UserNamebar";
import { setAutoUserAssign } from "../../../global/userSlice";

function UserCard({ user, set, onSet, istoggle, toggle }) {
  const [isSelected, setIsSelected] = useState(user?._id === set?._id);
  const targetRef = useRef(null);

  useEffect(() => {
    setIsSelected(user?._id === set?._id);
  }, [set, user]);

  const dispatch = useDispatch();
  const handleUserSelect = () => {
    if (user._id === set?._id) {
      dispatch(setAutoUserAssign(!toggle));
    } else {
      dispatch(onSet(user));
      if (!toggle) {
        dispatch(setAutoUserAssign(false));
      }
    }
    setTimeout(() => {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 500);
  };


  return (
    <div
      className={`cardUser ${isSelected ? "selectedCard" : ""}`}
      onClick={handleUserSelect}
      id={`${user?._id}`}
      ref={targetRef}
    >
      <div className="cardUser-body">
        <div className="cardUser-body-top">
          <UserNamebar user={user} />
        </div>

        <div className="cardUser-body-center">
          <div className="cardUser-body-bottom-icons">
            <div className="cardUser-body-bottom-icons-item">
              <HomeIcon path="payments" color="#00b100" />
              <p>{typeof user.applications === "number" ? user.applications : "N/A"}</p>
            </div>
            <div className="cardUser-body-bottom-icons-item">
              <HomeIcon path="ongoing" color="#0075fc" />
              <p>{typeof user.ongoing === "number" ? user.ongoing : "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="cardUser-body-bottom-country">
          <CountryBtn style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
            {typeof user.state === "string" ? user.state : "N/A"}
          </CountryBtn>
        </div>
      </div>
    </div>
  );
}

export default UserCard;