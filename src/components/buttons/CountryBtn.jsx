export default function CountryBtn({ children, style, onClick }) {
  return (
    <div className="btn countrybtn" style={style} onClick={onClick}>
      {children}
    </div>
  );
}
