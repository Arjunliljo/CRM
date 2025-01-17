import CIrclePlus from "../../../buttons/CIrclePlus";
import HomeIcon from "../../../utils/Icons/HomeIcon";

export default function LeadCardHeader() {
  return (
    <header>
      <h1 className="title">Leads</h1>
      <CIrclePlus>
        <HomeIcon path="plus" color="#0b0b0bf8" />
      </CIrclePlus>
    </header>
  );
}
