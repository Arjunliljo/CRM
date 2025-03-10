import { createContext, useContext } from "react";

const GeneralContext = createContext();

function GeneralProvider({ children, tab }) {
  return (
    <GeneralContext.Provider value={{ tab }}>
      {children}
    </GeneralContext.Provider>
  );
}

function useGeneral() {
  const context = useContext(GeneralContext);

  if (context === undefined)
    throw new Error("Context using outside the provider");

  return context;
}

export { useGeneral, GeneralProvider };
