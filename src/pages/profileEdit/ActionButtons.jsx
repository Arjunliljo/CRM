import React from "react";
import NextBtn from "../../components/buttons/NextBtn";

export default function ActionButtons({
  onHandleNext,
  onHandleCancel,
  onHandleCreate,
  activeTab,
}) {
  return (
    <div className="action-buttons">
      <button className="btn-cancel" onClick={onHandleCancel}>
        Cancel
      </button>
      {activeTab === 2 ? (
        <NextBtn onClick={onHandleCreate}>Create</NextBtn>
      ) : (
        <NextBtn onClick={onHandleNext}>Next</NextBtn>
      )}
    </div>
  );
}
