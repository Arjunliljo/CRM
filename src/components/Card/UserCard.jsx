import { useEffect, useRef, useState } from "react";
import Mover from "../../features/Mover";
import CountryBtn from "../buttons/CountryBtn";
import InfoBtn from "../buttons/InfoBtn";
import HomeIcon from "../utils/Icons/HomeIcon";
import { useDispatch, useSelector } from "react-redux";
import UserNamebar from "./UserRight/UserNamebar";

function UserCard({ user, set, onSet, istoggle, toggle }) {
  const [isSelected, setIsSelected] = useState(user?._id === set?._id);
  const targetRef = useRef(null);
  const { autoLeadsAssign, curLead } = useSelector((state) => state.user);

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
        dispatch(setAutoUserAssign(true));
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
          {/* <InfoBtn color="white" bgcl="green">
            Interested
          </InfoBtn> */}
        </div>

        <div className="cardUser-body-center">
          <div className="cardUser-body-bottom-icons">
            <div className="cardUser-body-bottom-icons-item">
              <HomeIcon
                path="u-turn"
                color="#00b100"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{user.applications}</p>
            </div>
            <div className="cardUser-body-bottom-icons-item">
              <HomeIcon
                path="retry"
                color="#0075fc"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{user.ongoing}</p>
            </div>
          </div>
        </div>

        <div className="cardUser-body-bottom-country">
          <CountryBtn style={{ paddingLeft: "2rem", paddingRight: "2rem" }}>
            {user.state}
          </CountryBtn>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
