import { createContext } from "react";
import { UserAction, UserState, userInitialState } from "../reducers/UserReducer";

export const UserContext = createContext<UserState>(userInitialState);

export const UserDispatchContext = createContext<React.Dispatch<UserAction>>(()=>{});