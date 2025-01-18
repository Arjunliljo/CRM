import { Modal } from "antd";


export default function ModalBase({ isOpen, closeModal, title, children }) {
  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      centered
      className="modal"
    >
      <div className="modal-content">
        {children}
      </div>
    </Modal>
  );
}