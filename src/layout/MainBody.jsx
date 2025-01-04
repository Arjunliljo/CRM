export default function MainBody({ head, body }) {
  return (
    <main className="main-body leads">
      <div className="main-body-head">{head}</div>
      <div className="main-body-box">{body}</div>
    </main>
  );
}
