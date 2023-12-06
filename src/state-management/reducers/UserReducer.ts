import { setCookie, removeCookie } from "typescript-cookie";
export const USER_COOKIE_NAME = "userData";

export interface UserPayload {
	username: string;
	role: "user" | "moderator" | null;
	userID: string | null;
}

export interface UserState extends UserPayload {
	isLoggedIn: boolean;
}

export enum UserActionKind {
	LOGIN = "login",
	LOGOUT = "logout",
}

export interface UserAction {
	type: UserActionKind;
	payload?: UserPayload;
}

export const userInitialState: UserState = {
	username: "",
	role: null,
	userID: null,
	isLoggedIn: false,
};

export const userReducer = (
	state: UserState,
	action: UserAction
): UserState => {
	const { type, payload } = action;
	switch (type) {
		case UserActionKind.LOGIN: {
			if (payload) {
				state = { ...payload, isLoggedIn: true };
				setCookie(USER_COOKIE_NAME, JSON.stringify(state), { expires: 1 });
			}
			break;
		}
		case UserActionKind.LOGOUT: {
			removeCookie(USER_COOKIE_NAME);
			state = userInitialState;
			break;
		}
	}
	return state;
};
