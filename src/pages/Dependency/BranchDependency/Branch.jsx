import { useState } from "react";
import { message } from "antd";
import { createBranch } from "../../../../config/axiosService";
import CancelBtn from "../../../components/buttons/CancelBtn";
import NextBtn from "../../../components/buttons/NextBtn";

export default function Branch() {
  const [newBranch, setNewBranch] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBranch((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newBranch.name) {
      message.error("Please fill in the branch name");
      return;
    }

    createBranch(newBranch)
      .then((response) => {
        setNewBranch({ name: "" });
        message.success("Role created successfully!");
      })
      .catch((error) => {
        message.error("Error creating role. Please try again.");
      });
  };

  return (
    <div className="content-section dependancies">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Add new Branch</h2>
      </div>

      {/* Step 4: Wrap the form inside a <form> element */}
      <form onSubmit={handleSubmit} className="content-section-item-box">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={newBranch.name}
            onChange={handleChange}
            placeholder="Branch Name"
            className="input-formGroup"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            name="name"
            value={newBranch.name}
            onChange={handleChange}
            // placeholder="Description"
            className="input-formGroup"
            required
          />
        </div>

        <div className="modal__form-buttons" style={{ marginTop: "2rem" }}>
          <CancelBtn onClick={() => setNewBranch({ name: "" })}>
            Cancel
          </CancelBtn>
          <NextBtn onClick={handleSubmit}>Save</NextBtn>
        </div>
      </form>
    </div>
  );
}
