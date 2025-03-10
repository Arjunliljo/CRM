import { GeneralProvider } from "../../context/generalContext/GeneralContext";
import GeneralDataProvider from "../../context/generalContext/GeneralDataProvider";

export default function General({ tab }) {
  return (
    <GeneralProvider tab={tab}>
      <GeneralDataProvider tab={tab} />
    </GeneralProvider>
  );
}
