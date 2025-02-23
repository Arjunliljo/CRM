import SecondryBtn from "../../buttons/SecondryBtn";

function StartApplication({ handleStartApplication }) {
  return (
    <div className="start-application">
      <button onClick={handleStartApplication}>Start Application</button>
    </div>
  );
}

export default StartApplication;
