import { useState, useEffect } from "react";
import { message } from "antd";
import CancelBtn from "../../../components/buttons/CancelBtn";
import NextBtn from "../../../components/buttons/NextBtn";
import apiClient from "../../../../config/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setCountryEdit } from "../../../../global/creationSlice";
import { refetchCountries } from "../../../apiHooks/useCountries";

export default function UpdateCountry() {
  const [isLoading, setIsLoading] = useState(false);
  const { editCountry } = useSelector((state) => state.creation);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const dispatch = useDispatch();

  // Sync formData with Redux's editBranch
  useEffect(() => {
    if (editCountry) {
      setFormData({
        name: editCountry.name || "",
        description: editCountry.description || "",
      });
    }
  }, [editCountry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      message.error("Please fill in the branch name");
      return;
    }

    try {
      setIsLoading(true);
      await apiClient.patch(`/country/${editCountry._id}`, formData);
      refetchCountries();
      message.success("Country updated successfully!");
    } catch (e) {
      message.error("Error updating country. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    dispatch(setCountryEdit({ isCountryEdit: false, editCountry: {} }));
  };

  return (
    <div className="content-section dependancies">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Update Country</h2>
      </div>

      <form onSubmit={handleSubmit} className="dependancies-item-box">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Country Name"
            className="input-formGroup"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Country Description"
            className="input-formGroup"
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
