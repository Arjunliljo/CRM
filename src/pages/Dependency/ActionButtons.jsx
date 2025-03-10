export default function ActionButtons({ onHandleNext, onHandleCancel }) {
  return (
    <div className="action-buttons">
      <button className="btn-cancel" onClick={onHandleCancel}>
        Previous
      </button>
      <button className="btn-next" onClick={onHandleNext}>
        Next
      </button>
    </div>
  );
}
