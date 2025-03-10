import { createContext, useContext, useReducer } from "react";
import { useGeneralLeads } from "./hooks/useGeneralLeads";

const GeneralContext = createContext();

// Add reducer and initial state
const initialState = {
  isAssigning: false,
  toAssignGenerals: [],
  toAssignGeneral: [],
  curGeneral: null,
  isToggle: false,
};

function generalReducer(state, action) {
  switch (action.type) {
    case "SET_IS_ASSIGNING":
      return { ...state, isAssigning: action.payload };
    case "SET_TO_ASSIGN_GENERALS":
      return { ...state, toAssignGenerals: action.payload };
    case "TO_ASSIGN_GENERAL":
      return { ...state, toAssignGeneral: action.payload };
    case "CUR_GENERAL":
      return { ...state, curGeneral: action.payload };
    case "IS_TOGGLE":
      return { ...state, isToggle: action.payload };
    default:
      return state;
  }
}

function GeneralProvider({ children, tab }) {
  const genLeadConfigs = useGeneralLeads(tab);
  const [state, dispatch] = useReducer(generalReducer, initialState);

  const setIsAssigning = (value) =>
    dispatch({ type: "SET_IS_ASSIGNING", payload: value });
  const setToAssignGenerals = (value) =>
    dispatch({ type: "SET_TO_ASSIGN_GENERALS", payload: value });
  const setToAssignGeneral = (value) =>
    dispatch({ type: "TO_ASSIGN_GENERAL", payload: value });
  const setCurGeneral = (value) =>
    dispatch({ type: "CUR_GENERAL", payload: value });
  const setIsToggle = (value) =>
    dispatch({ type: "IS_TOGGLE", payload: value });

  return (
    <GeneralContext.Provider
      value={{
        tab,
        genLeadConfigs,
        isAssigning: state.isAssigning,
        toAssignGenerals: state.toAssignGenerals,
        toAssignGeneral: state.toAssignGeneral,
        curGeneral: state.curGeneral,
        isToggle: state.isToggle,
        setIsAssigning,
        setToAssignGenerals,
        setToAssignGeneral,
        setCurGeneral,
        setIsToggle,
      }}
    >
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
