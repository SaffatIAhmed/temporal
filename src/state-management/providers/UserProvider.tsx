import { PropsWithChildren, useEffect, useReducer } from "react";
import { UserContext, UserDispatchContext } from "../contexts/UserContext";
import { USER_DATA_KEY, UserActionKind, UserState, userInitialState, userReducer } from "../reducers/UserReducer";
import axios from "axios";

function UserProvider({ children }: PropsWithChildren) {
  const [userState, dispatch] = useReducer(userReducer, userInitialState);
  axios.interceptors.response.use(res => res,
    err => {
      console.log("axios interceptor detected unauthorized access");
      dispatch({ type: UserActionKind.LOGOUT });
      return Promise.reject(err);
    });

  useEffect(() => {
    const data = localStorage.getItem(USER_DATA_KEY)
    if (data) {
      const userState = JSON.parse(data) as UserState;
      if (userState) {
        dispatch({ type: UserActionKind.LOGIN, payload: userState })
      }
    }
  }, []);

  return (
    <UserContext.Provider value={userState}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  )
}


export default UserProvider;