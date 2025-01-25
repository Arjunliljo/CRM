import { useState, useEffect } from "react";
import { message } from "antd";
import CancelBtn from "../../../components/buttons/CancelBtn";
import NextBtn from "../../../components/buttons/NextBtn";
import apiClient from "../../../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setRoleEdit } from "../../../../global/creationSlice";
import { refetchRoles } from "../../../apiHooks/useRoles";

export default function UpdateRole() {
  const [isLoading, setIsLoading] = useState(false);
  const { editRole } = useSelector((state) => state.creation);

  const [formData, setFormData] = useState({ name: "", description: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    if (editRole) {
      setFormData({
        name: editRole.name || "",
        description: editRole.description || "",
      });
    }
  }, [editRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      message.error("Please fill in the role name");
      message.error("Please fill in the role name");
      return;
    }

    try {
      setIsLoading(true);
      await apiClient.patch(`/role/${editRole._id}`, formData);
      refetchRoles();
      message.success("Role updated successfully!");
      await apiClient.patch(`/role/${editRole._id}`, formData);
      refetchRoles();
      message.success("Role updated successfully!");
    } catch (e) {
      message.error("Error updating role. Please try again.");
      message.error("Error updating role. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    dispatch(setRoleEdit({ isRoleEdit: false, editRole: {} }));
  };

  return (
    <div className="content-section dependancies">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Update Role</h2>
      </div>

      <form onSubmit={handleSubmit} className="dependancies-item-box">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Role Name"
            className="forms-input"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Role Description"
            className="forms-input"
            required
          />
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
