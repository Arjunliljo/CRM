export default function MainBody({
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
          <div className="main-body-head-left-bottom">
            {BottomLeft?.map((item) => item)}
          </div>
        </div>

        {/* Right side of the header */}
        <div className="main-body-head-right">
          <div className="main-body-head-right-top">
            {TopRight?.map((item) => item)}
          </div>
          <div className="main-body-head-right-bottom">
            {BottomRight?.map((item) => item)}
          </div>
        </div>
      </div>

      {/* Box of the main body */}
      <div
        className="main-body-box"
        style={switching ? { gap: "1rem" } : { gap: "0" }}
      >
        {/* includes the contents */}
        <div
          className={`main-body-box-left`}
          style={switching ? { width: "50%" } : { width: "100%" }}
        >
          <div className="main-body-scroll-container">{IContents}</div>
        </div>

        {/* Right side of the box the dynamic one*/}
        <div
          className="main-body-box-right"
          style={switching ? { width: "50%" } : { width: "0%" }}
        >
          {ProfileCard}
          {StartApplication}
        </div>
      </div>
    </main>
  );
}
