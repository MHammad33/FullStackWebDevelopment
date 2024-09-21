import { createContext, useReducer, useContext } from "react";

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      window.localStorage.setItem("loggedUser", JSON.stringify(action.payload));
      return action.payload;
    case "LOGOUT":
      window.localStorage.removeItem("loggedUser");
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

const initialState = JSON.parse(window.localStorage.getItem("loggedUser")) || null;

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initialState);

  return <UserContext.Provider value={[user, dispatch]}>{children}</UserContext.Provider>;
};

export const useUserValue = () => useContext(UserContext)[0];
export const useUserDispatch = () => useContext(UserContext)[1];
