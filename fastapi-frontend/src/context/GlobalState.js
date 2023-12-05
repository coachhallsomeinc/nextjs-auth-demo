import { createContext, useReducer, useContext } from "react";
// Define the initial state
const initialState = {
  user: null,
  isAuthenticated: false,
};
// Create a context object
const GlobalStateContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOGOUT_USER":
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
}

// Provider component to wrap the app
export function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { initialState });
  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}
// Custom hook to use the global state
export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
}
