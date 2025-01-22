export default function CustomBody({
  TopLeft = [],
  TopRight = [],
  IContents = <></>,
  switching = false,
  BottomLeft = [],
  BottomRight = [],
  ProfileCard = <></>,
  StartApplication = <></>,
}) {
  return (
    <main className="main-body leads">
      <div className="main-body-head">
        {/* Left side of the header */}
        <div className="main-body-head-left">
          <div className="main-body-head-left-top">
            {TopLeft?.map((item) => item)}
          </div>
        </div>
      </div>

      <div>{IContents}</div>
    </main >
  );
}
