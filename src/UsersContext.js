import React, { createContext, useContext, useReducer } from "react";
import * as api from "./api";
import {
  createAsyncDispatcher,
  createAsyncHandler,
  initialAsyncState,
} from "./asyncActionUtils";

const initialState = {
  users: initialAsyncState,
  user: initialAsyncState,
};
const usersHandler = createAsyncHandler("GET_USERS", "users");
const userHandler = createAsyncHandler("GET_USER", "user");
const usersReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
    case "GET_USERS_SUCCESS":
    case "GET_USERS_ERROR":
      return usersHandler(state, action);
    case "GET_USER":
    case "GET_USER_SUCCESS":
    case "GET_USER_ERROR":
      return userHandler(state, action);
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
};

const UsersStateContext = createContext(null);
const UsersDispatchContext = createContext(null);

export const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState);

  return (
    <UsersDispatchContext.Provider value={dispatch}>
      <UsersStateContext.Provider value={state}>
        {children}
      </UsersStateContext.Provider>
    </UsersDispatchContext.Provider>
  );
};

export const useUsersState = () => {
  const state = useContext(UsersStateContext);
  if (!state) {
    throw new Error("Cannot find UserProvider");
  }

  return state;
};

export const useUsersDispatch = () => {
  const dispatch = useContext(UsersDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find UserProvider");
  }

  return dispatch;
};

export const getUsers = createAsyncDispatcher("GET_USERS", api.getUsers);
export const getUser = createAsyncDispatcher("GET_USER", api.getUser);
