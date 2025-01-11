import { useEffect, useRef, useState } from "react";
import CountryBtn from "../buttons/CountryBtn";
import HomeIcon from "../utils/Icons/HomeIcon";
import NameBar from "./NameBar";
import { useDispatch } from "react-redux";

function BranchManagingCard({ branchmanage, set, onSet }) {
  const [isSelected, setIsSelected] = useState(branchmanage?._id === set?._id);
  const targetRef = useRef(null);

  useEffect(() => {
    setIsSelected(branchmanage?._id === set?._id);
  }, [set, user]);

  const dispatch = useDispatch();
  const handleUserSelect = () => {
    dispatch(onSet(branchmanage));
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
          <NameBar lead={branchmanage} />
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
              <p>{branchmanage.applications}</p>
            </div>
            <div className="cardUser-body-bottom-icons-item">
              <HomeIcon
                path="retry"
                color="#0075fc"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{branchmanage.ongoing}</p>
            </div>
          </div>
        </div>

        <div className="cardUser-body-bottom-country">
          <CountryBtn>{branchmanage.state}</CountryBtn>
        </div>
      </div>
    </div>
  );
}

export default BranchManagingCard;
