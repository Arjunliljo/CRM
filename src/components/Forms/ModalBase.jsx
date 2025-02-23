import { Modal } from "antd";

export default function ModalBase({
  isOpen,
  closeModal,
  title,
  children,
  centered = false,
  width,
}) {
  return (
    <Modal
      // title={title}
      open={isOpen}
      onCancel={closeModal}
      footer={null}
      centered={centered}
      className="modal"
      forceRender
      mask={true}
      width={width}
    >
      <div className="modal-content">{children}</div>
    </Modal>
  );
}
