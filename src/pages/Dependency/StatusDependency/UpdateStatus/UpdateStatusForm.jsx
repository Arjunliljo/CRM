import { useDispatch, useSelector } from "react-redux";
import { setStatusEdit } from "../../../../../global/creationSlice";
import CancelBtn from "../../../../components/buttons/CancelBtn";
import NextBtn from "../../../../components/buttons/NextBtn";
import UpdateStatusRow1 from "./components/UpdateStatusRow1";
import UpdateStatusRow2 from "./components/UpdateStatusRow2";
import apiClient from "../../../../../config/axiosInstance";
import { refetchStatuses } from "../../../../apiHooks/useStatuses";
import { message } from "antd";
import { useEffect, useState } from "react";

export default function UpdateStatusForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { editStatus } = useSelector((state) => state.creation);

  const [formData, setFormData] = useState({
    name: editStatus.name || "",
    isTab: editStatus.isTab ?? null,
    class: editStatus.class || "",
    isCountryBased: editStatus.isCountryBased ?? null,
    isApplication: editStatus.isApplication ?? null,
    description: editStatus.description || "",
    subStatuses: editStatus.subStatuses || [],
    countries: editStatus.countries || [],
  });

  const dispatch = useDispatch();

  // Sync formData with Redux's editStatus
  useEffect(() => {
    if (editStatus) {
      setFormData({
        name: editStatus.name || "",
        isTab: editStatus.isTab ?? null,
        class: editStatus.class || "",
        isCountryBased: editStatus.isCountryBased ?? null,
        isApplication: editStatus.isApplication ?? null,
        description: editStatus.description || "",
        subStatuses: editStatus.subStatuses || [],
        countries: editStatus.countries || [],
      });
    }
  }, [editStatus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      message.error("Please fill in the status name");
      return;
    }

    try {
      setIsLoading(true);
      await apiClient.patch(`/status/${editStatus._id}`, formData);
      refetchStatuses();
      message.success("Status updated successfully!");
    } catch (e) {
      message.error("Error updating Status. Please try again.");
    } finally {
      setIsLoading(false);
      dispatch(setStatusEdit({ isBranchEdit: false, editStatus: {} }));
    }
  };

  const handleCancel = () => {
    dispatch(setStatusEdit({ isBranchEdit: false, editStatus: {} }));
  };

  return (
    <div className="content-section dependancies">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Update Status</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="dependancies-content-row">
          <UpdateStatusRow1
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
          />
          <UpdateStatusRow2 formData={formData} setFormData={setFormData} />
        </div>

        <div className="modal__form-buttons" style={{ marginTop: "2rem" }}>
          <CancelBtn onClick={handleCancel}>Discard</CancelBtn>
          <NextBtn type="submit" isLoading={isLoading}>
            Update
          </NextBtn>
        </div>
      </form>
    </div>
  );
}
