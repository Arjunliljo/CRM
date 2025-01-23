import { useState } from "react";
import { createRole } from "../../../../config/axiosService";
import CountryBtn from "../../../components/buttons/CountryBtn";
import { message } from "antd";
import CancelBtn from "../../../components/buttons/CancelBtn";
import NextBtn from "../../../components/buttons/NextBtn";

// Your Role component
export default function Role() {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newItem.name || !newItem.description) {
      message.error("Please fill in all fields");
      return;
    }
    createRole(newItem)
      .then((response) => {
        setNewItem({ name: "", description: "" });
        message.success("Role created successfully!");
      })
      .catch((error) => {
        message.error("Error creating role. Please try again.");
      });
  };

  return (
    <div className="content-section">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>Add new Role</h2>
      </div>

      <form onSubmit={handleSubmit} className="content-section-item-box">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={newItem.name}
            onChange={handleChange}
            placeholder="Name"
            className="input-formGroup"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="description"
            value={newItem.description}
            onChange={handleChange}
            placeholder="Description"
            className="input-formGroup"
            required
          />
        </div>

        <div className="modal__form-buttons" style={{ marginTop: "2rem" }}>
          <CancelBtn
            type="button"
            onClick={() => setNewItem({ name: "", description: "" })}
          >
            Cancel
          </CancelBtn>
          <NextBtn type="submit" style={{ backgroundColor: "#0075fc" }}>
            Save
          </NextBtn>
        </div>
      </form>
    </div>
  );
}
