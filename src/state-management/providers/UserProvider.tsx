import { PropsWithChildren, useEffect, useReducer } from "react";
import { UserContext, UserDispatchContext } from "../contexts/UserContext";
import { USER_COOKIE_NAME, UserActionKind, UserState, userInitialState, userReducer } from "../reducers/UserReducer";
import { getCookie } from "typescript-cookie";

function UserProvider({ children }: PropsWithChildren) {
  const [userState, dispatch] = useReducer(userReducer, userInitialState);
  useEffect(() => {
    const data = getCookie(USER_COOKIE_NAME);
    if (data) {
      const userState = JSON.parse(data) as UserState;
      if (userState.isLoggedIn) {
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