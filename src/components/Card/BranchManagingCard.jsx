import { useEffect, useRef, useState } from "react";
import CountryBtn from "../buttons/CountryBtn";
import HomeIcon from "../utils/Icons/HomeIcon";
import NameBar from "./NameBar";
import { useDispatch, useSelector } from "react-redux";
import { setAutoBranchmanageAssign } from "../../../global/branchSlice";

function BranchManagingCard({ branchmanage, set, onSet, istoggle, toggle }) {
  const [isSelected, setIsSelected] = useState(branchmanage?._id === set?._id);
  const targetRef = useRef(null);

  const { autoLeadsAssign, curLead } = useSelector(
    (state) => state.branchmanage
  );

  useEffect(() => {
    setIsSelected(branchmanage?._id === set?._id);
  }, [set, branchmanage]);

  const dispatch = useDispatch();
  const handleBranchmanageSelect = () => {
    if (branchmanage._id === set?._id) {
      dispatch(setAutoBranchmanageAssign(!toggle));
    } else {
      dispatch(onSet(branchmanage));
      if (!toggle) {
        dispatch(setAutoBranchmanageAssign(false));
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
      className={`cardBranchmanage ${isSelected ? "selectedCard" : ""}`}
      onClick={handleBranchmanageSelect}
      id={`${branchmanage?._id}`}
      ref={targetRef}
    >
      <div className="cardBranchmanage-body">
        <div className="cardBranchmanage-body-top">
          <NameBar lead={branchmanage} />
          {/* <InfoBtn color="white" bgcl="green">
              Interested
            </InfoBtn> */}
        </div>

        <div className="cardBranchmanage-body-center">
          <div className="cardBranchmanage-body-bottom-icons">
            <div className="cardBranchmanage-body-bottom-icons-item">
              <HomeIcon
                path="u-turn"
                color="#00b100"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{branchmanage.applications}</p>
            </div>
            <div className="cardBranchmanage-body-bottom-icons-item">
              <HomeIcon
                path="retry"
                color="#0075fc"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{branchmanage.ongoing}</p>
            </div>
          </div>
        </div>

        <div className="cardBranchmanage-body-bottom-country">
          <CountryBtn>{branchmanage.state}</CountryBtn>
        </div>
      </div>
    </div>
  );
}

export default BranchManagingCard;
