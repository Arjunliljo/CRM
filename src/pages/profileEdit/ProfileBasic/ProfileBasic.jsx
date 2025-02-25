import { useDispatch, useSelector } from "react-redux";
import {
  setProfileAddressOne,
  setProfileAddressTwo,
  setProfileContactNumber,
  setProfileEmail,
  setProfileEmployeeId,
  setProfileName,
} from "../../../../global/profileSlice";
import { BsExclamation } from "react-icons/bs";

export default function ProfileBasic({ isCreate }) {
  const { email, contactNumber, employeeId, addressOne, addressTwo, name } =
    useSelector((state) => state.profile);
  const profileData = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <div className="content-section">
      <div className="content-section-head">
        <h2 className="small-heading">Personal Details</h2>
      </div>
      <div className="content-section-item-box">
        <div className="form-group">
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              className="forms-input"
              onChange={(e) => dispatch(setProfileName(e.target.value))}
            />
            {isCreate && !profileData.name && (
              <BsExclamation className="error-icon error-icon-position" />
            )}
          </div>
        </div>
        <div className="form-group">
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="tel"
              placeholder="Contact Number"
              className="forms-input"
              value={contactNumber}
              onChange={(e) =>
                dispatch(setProfileContactNumber(e.target.value))
              }
            />
            {isCreate && !profileData.contactNumber && (
              <BsExclamation className="error-icon error-icon-position " />
            )}
          </div>
        </div>
        <div className="form-group">
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              placeholder="Employee ID"
              className="forms-input"
              value={employeeId}
              onChange={(e) => dispatch(setProfileEmployeeId(e.target.value))}
            />
            {isCreate && !profileData.employeeId && (
              <BsExclamation className="error-icon error-icon-position" />
            )}
          </div>
        </div>
        <div className="form-group">
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="email"
              placeholder="Email"
              className="forms-input"
              value={email}
              onChange={(e) => dispatch(setProfileEmail(e.target.value))}
            />
            {isCreate && !profileData.email && (
              <BsExclamation className="error-icon error-icon-position" />
            )}
          </div>
        </div>
        <div className="form-group">
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              placeholder="Address Line 1"
              className="forms-input"
              value={addressOne}
              onChange={(e) => dispatch(setProfileAddressOne(e.target.value))}
            />
            {isCreate && !profileData.addressOne && (
              <BsExclamation className="error-icon error-icon-position" />
            )}
          </div>
        </div>
        <div className="form-group">
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type="text"
              placeholder="Address Line 2"
              className="forms-input"
              value={addressTwo}
              onChange={(e) => dispatch(setProfileAddressTwo(e.target.value))}
            />
            {isCreate && !profileData.addressTwo && (
              <BsExclamation className="error-icon error-icon-position" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
