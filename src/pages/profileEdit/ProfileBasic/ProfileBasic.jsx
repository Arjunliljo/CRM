import { useDispatch, useSelector } from "react-redux";
import {
  setProfileAddressOne,
  setProfileAddressTwo,
  setProfileContactNumber,
  setProfileEmail,
  setProfileEmployeeId,
  setProfileName,
} from "../../../../global/profileSlice";

export default function ProfileBasic() {
  const { email, contactNumber, employeeId, addressOne, addressTwo, name } =
    useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return (
    <div className="content-section">
      <div className="content-section-head">
        <h2 className="small-heading">Personal Details</h2>
      </div>

      <div className="content-section-item-box">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            value={name}
            className="forms-input"
            onChange={(e) => dispatch(setProfileName(e.target.value))}
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            placeholder="Contact Number"
            className="forms-input"
            value={contactNumber}
            onChange={(e) => dispatch(setProfileContactNumber(e.target.value))}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Employee ID"
            className="forms-input"
            value={employeeId}
            onChange={(e) => dispatch(setProfileEmployeeId(e.target.value))}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            className="forms-input"
            value={email}
            onChange={(e) => dispatch(setProfileEmail(e.target.value))}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Address Line 1"
            className="forms-input"
            value={addressOne}
            onChange={(e) => dispatch(setProfileAddressOne(e.target.value))}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Address Line 2"
            className="forms-input"
            value={addressTwo}
            onChange={(e) => dispatch(setProfileAddressTwo(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
