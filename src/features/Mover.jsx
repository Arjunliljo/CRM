export default function Mover({ num = 1 }) {
  if (num > 4) {
    throw new Error("Number of items must be less than 4");
  }
  return (
    <div className="mover">
      {Array.from({ length: 4 }).map((_, index) =>
        index < num ? (
          <div className="mover-item" key={index}></div>
        ) : (
          <div className="mover-item mover-gray" key={index}></div>
        )
      )}
    </div>
  );
}
