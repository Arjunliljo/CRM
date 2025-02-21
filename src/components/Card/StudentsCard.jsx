import { useDispatch } from "react-redux";
import Mover from "../../features/Mover";
import CountryBtn from "../buttons/CountryBtn";
import InfoBtn from "../buttons/InfoBtn";
import HomeIcon from "../utils/Icons/HomeIcon";
import NameBar from "./NameBar";
import { useEffect, useRef, useState } from "react";
import { setAutoStudentsAssign } from "../../../global/studentsSlice";
import { message } from "antd";
import { useKey } from "../../hooks/useKey";

function StudentsCard({ student, set, onSet, istoggle, toggle, onsubmit }) {
  const [isSelected, setIsSelected] = useState(student?._id === set?._id);
  const [remark, setRemark] = useState(student?.remark || "");
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    setIsSelected(student?._id === set?._id);
  }, [set, student]);

  const dispatch = useDispatch();
  const handleStudentSelect = () => {
    if (student._id === set?._id) {
      dispatch(setAutoStudentsAssign(!toggle));
    } else {
      dispatch(onSet(student));
      if (!toggle) {
        dispatch(setAutoStudentsAssign(false));
      }
    }
    setTimeout(() => {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 500);
  };

  useKey("Enter", async () => {
    if (isTextareaFocused && remark.trim()) {
        onsubmit(remark, student._id);

    }
  });

  return (
    <div
      className={`card ${isSelected ? "selectedCard" : ""}`}
      onClick={handleStudentSelect}
      id={`${student?._id}`}
      ref={targetRef}
    >
      <div className="card-head">
        <Mover num={student.num} />
      </div>
      <div className="card-body">
        <div className="card-body-top">
          <NameBar lead={student} />
          <InfoBtn color="white" bgcl="green">
            Interested
          </InfoBtn>
        </div>
        <div className="card-body-mid">
          <textarea
            type="text"
            placeholder="Add a remark"
            value={remark}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setRemark(e.target.value)}
            onFocus={() => setIsTextareaFocused(true)}
            onBlur={() => setIsTextareaFocused(false)}
          />
        </div>

        <div className="card-body-bottom">
          <div className="card-body-bottom-icons">
            <div className="card-body-bottom-icons-item">
              <HomeIcon
                path="u-turn"
                color="#00b100"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{student.applications} Applications</p>
            </div>
            <div className="card-body-bottom-icons-item">
              <HomeIcon
                path="retry"
                color="#0075fc"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{student.attempts} Attempts</p>
            </div>
          </div>
        </div>

        <div className="card-body-bottom-country">
          <CountryBtn>{student.country}</CountryBtn>
          <div className="card-body-bottom-country-count">3</div>
        </div>
      </div>
    </div>
  );
}

export default StudentsCard;
