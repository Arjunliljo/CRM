import { useDispatch } from "react-redux";
import Mover from "../../features/Mover";
import CountryBtn from "../buttons/CountryBtn";
import InfoBtn from "../buttons/InfoBtn";
import HomeIcon from "../utils/Icons/HomeIcon";
import NameBar from "./NameBar";
import { useEffect, useRef, useState } from "react";
import { setStudentDetailToggle } from "../../../global/studentsSlice";

import { useKey } from "../../hooks/useKey";
import { useApi } from "../../context/apiContext/ApiContext";
import { getCountryName, getStatusName } from "../../service/nameFinders";

function StudentsCard({
  student,
  set,
  onSet,
  toggle,
  onsubmit,
  isAssigning,
  assigninSetter,
  toAssignStudents,
}) {
  const [isSelected, setIsSelected] = useState(student?._id === set?._id);
  const [remark, setRemark] = useState(student?.remark || "");
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  const {
    statusConfigs: { statuses },
    countryConfigs: { countries },
  } = useApi();

  const targetRef = useRef(null);

  const [countryName, setCountryName] = useState(
    getCountryName(student?.countries?.[0], countries)
  );
  const [statusName, setStatusName] = useState(
    getStatusName(student?.status, statuses)
  );

  useEffect(() => {
    setIsSelected(student?._id === set?._id);
    setStatusName(getStatusName(student?.status, statuses));
    setCountryName(getCountryName(student?.countries?.[0], countries));
  }, [set, student, countries, statuses]);

  const dispatch = useDispatch();

  const handleStudentNormalSelector = () => {
    if (student._id === set?._id) {
      dispatch(setStudentDetailToggle(!toggle));
    } else {
      dispatch(onSet(student));
      if (!toggle) {
        dispatch(setStudentDetailToggle(false));
      }
    }
    setTimeout(() => {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 500);
  };

  const handleStudentSelect = () => {
    if (isAssigning) {
      if (toAssignStudents.includes(student)) {
        dispatch(
          assigninSetter(toAssignStudents.filter((s) => s._id !== student._id))
        );
      } else {
        dispatch(assigninSetter([...toAssignStudents, student]));
      }
      return;
    }
    handleStudentNormalSelector();
  };

  useKey("Enter", async () => {
    if (isTextareaFocused && remark.trim()) {
      onsubmit(remark, student._id);
    }
  });

  const reAssignChecker = () => {
    if (toAssignStudents.find((val) => val._id === student._id)) {
      return true;
    }
    return false;
  };

  return (
    <div
      className={`card ${isSelected ? "selectedCard" : ""} ${
        reAssignChecker() ? "selected-assign" : ""
      }`}
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
            {statusName}
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
              <p>{student?.application?.length} Applications</p>
            </div>
            <div className="card-body-bottom-icons-item">
              <HomeIcon
                path="retry"
                color="#0075fc"
                style={{ transform: "rotate(270deg)" }}
              />
              <p>{student.attemps} Attempts</p>
            </div>
          </div>
        </div>

        <div className="card-body-bottom-country">
          <CountryBtn>{countryName}</CountryBtn>
          <div className="card-body-bottom-country-count">
            {student?.assigned}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentsCard;
