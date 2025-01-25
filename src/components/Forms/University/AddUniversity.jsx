import { Input, Select } from "antd";
import CancelBtn from "../../buttons/CancelBtn";
import PrimaryBttn from "../../buttons/PrimaryBttn";
import NextBtn from "../../buttons/NextBtn";
import CountrySelectorUniversity from "./CountrySelectorUniversity";
import DegreeSelector from "./DegreeSelector";
import { useState } from "react";

export default function AddUniversity({
  closeModal,
  newUniversity,
  setNewUniversity,
  handleChange,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newUniversity.name) {
      message.error("Please fill in the branch name");
      return;
    }
    try {
      setIsLoading(true);
      const res = await apiClient.post("/university", newUniversity);
      setNewUniversity({ name: "" });
      refetchUniversity();
      message.success("Branch created successfully!");
    } catch (e) {
      setIsLoading(false);
      message.error("Error creating branch. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="modal__form">
        <div className="modal__form-input-text">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="University Name"
            className="input-formGroup"
            required
          />
        </div>

        <div className="modal__form-row">
          <div className="modal__form-input-text">
            <CountrySelectorUniversity />
          </div>

          <div className="modal__form-input-text">
            <DegreeSelector />
          </div>
        </div>

        <div className="modal__form-buttons">
          <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
          <NextBtn type="submit" onClick={handleSubmit}>
            Add
          </NextBtn>
        </div>
      </form>
    </>
  );
}
