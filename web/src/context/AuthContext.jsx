/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useReducer, useEffect } from "react";
import AuthReducer from "./AuthReducers";

const INITIAL_STATE = {
  user: {
    _id: {
      $oid: "67975d77ace30e98a218bc9f",
    },
    username: "the_soumya.rb",
    email: "soumyarb2021@gmail.com",
    password: "$2b$10$zZ2Rs6.u4fl0K1uO5oH7i.yTuvipsohHDRDi6nIyW1vV/yJCRQNs.",
    profilePicture: "",
    coverPicture: "",
    followers: ["67975da2ace30e98a218bca1"],
    followings: ["67975da2ace30e98a218bca1"],
    isAdmin: false,
    desc: "Hello Everyone, Welcome to my profile.",
    city: "Bhubaneswar",
    from: "Baripada",
    createdAt: {
      $date: "2025-01-27T10:18:31.075Z",
    },
    updatedAt: {
      $date: "2025-01-27T10:25:45.493Z",
    },
    __v: 0,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
