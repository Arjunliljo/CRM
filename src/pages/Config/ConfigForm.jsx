import { useState, useEffect } from "react";
import { message } from "antd";
import CancelBtn from "../../components/buttons/CancelBtn";
import NextBtn from "../../components/buttons/NextBtn";

export default function ConfigForm({ isEditing, initialData, onClose, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    clientId: "",
    appId: "",
    accountId: "",
    tempToken: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        clientId: initialData.clientId || "",
        appId: initialData.appId || "",
        accountId: initialData.accountId || "",
        tempToken: initialData.tempToken || ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      clientId: "",
      appId: "",
      accountId: "",
      tempToken: ""
    });
    onClose?.();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name) {
      message.error("Please fill in the configuration name");
      return;
    }

    setIsLoading(true);
    try {
      onSubmit(formData);
      message.success(isEditing ? "Configuration updated successfully!" : "Configuration created successfully!");
      resetForm();
    } catch (e) {
      message.error(isEditing ? "Error updating configuration" : "Error creating configuration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content-section dependancies">
      <div className="content-section-head" style={{ height: "fit-content" }}>
        <h2>{isEditing ? 'Edit' : 'Add new'} Configuration</h2>
      </div>

      <form onSubmit={handleSubmit} className="dependancies-item-box">
        <div className="form-group">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Configuration Name"
            className="forms-input"
            required
          />
        </div>
          {/* <div className="form-group">
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="forms-input"
            required
          />
        </div> */}
<div className="form-group">
          <input
            type="text"
            name="accountId"
            value={formData.accountId}
            onChange={handleChange}
            placeholder="Account ID"
            className="forms-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="clientId"
            value={formData.clientId}
            onChange={handleChange}
            placeholder="Client ID"
            className="forms-input"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="appId"
            value={formData.appId}
            onChange={handleChange}
            placeholder="App ID"
            className="forms-input"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="tempToken"
            value={formData.tempToken}
            onChange={handleChange}
            placeholder="Temporary Token"
            className="forms-input"
            required
          />
        </div>


        <div className="modal__form-buttons" style={{ marginTop: "2rem" }}>
          <CancelBtn onClick={resetForm}>
            Cancel
          </CancelBtn>
          <NextBtn type="submit" isLoading={isLoading}>
            {isEditing ? 'Update' : 'Save'}
          </NextBtn>
        </div>
      </form>
    </div>
  );
}
