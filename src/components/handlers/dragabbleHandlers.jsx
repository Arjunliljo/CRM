export const handleDrop = (
  e,
  dropIndex,
  localStatuses,
  setLocalStatuses,
  selectedStatus,
  setSelectedStatus
) => {
  e.preventDefault();
  e.currentTarget.classList.remove("drop-above", "drop-below");

  const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
  if (dragIndex === dropIndex) return;

  // Update the local state with the new order
  const newStatuses = [...localStatuses];
  const [movedItem] = newStatuses.splice(dragIndex, 1);
  newStatuses.splice(dropIndex, 0, movedItem);
  setLocalStatuses(newStatuses);

  // Update selected status if it was moved
  if (selectedStatus === localStatuses[dragIndex]) {
    setSelectedStatus(movedItem);
  }
};

export const handleDragStart = (e, index, setDraggedIndex) => {
  setDraggedIndex(index);
  e.dataTransfer.setData("text/plain", index);
  e.currentTarget.classList.add("dragging");
};

export const handleDragEnd = (e, setDraggedIndex) => {
  setDraggedIndex(null);
  e.currentTarget.classList.remove("dragging");
};

export const handleDragOver = (e, index, draggedIndex) => {
  e.preventDefault();
  const dragBox = e.currentTarget;

  if (draggedIndex !== null && draggedIndex !== index) {
    const afterMiddle =
      e.clientY >
      dragBox.getBoundingClientRect().top + dragBox.offsetHeight / 2;
    dragBox.classList.toggle("drop-above", !afterMiddle);
    dragBox.classList.toggle("drop-below", afterMiddle);
  }
};

export const handleDragLeave = (e) => {
  e.currentTarget.classList.remove("drop-above", "drop-below");
};
