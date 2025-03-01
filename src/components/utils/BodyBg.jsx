export default function BodyBg({ isRotate = false }) {
  return <div className={`body-bg ${isRotate ? "rotate" : ""}`} ></div>;
}
