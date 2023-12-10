export const USER_DATA_KEY = "userData";

export interface UserState {
	username: string;
	role: "user" | "moderator" | null;
	id: number | null;
}

export enum UserActionKind {
	LOGIN = "login",
	LOGOUT = "logout",
}

export interface UserAction {
	type: UserActionKind;
	payload?: UserState;
}

export const userInitialState: UserState = {
	username: "",
	role: null,
	id: null,
};

export const userReducer = (
	state: UserState,
	action: UserAction
): UserState => {
	const { type, payload } = action;
	switch (type) {
		case UserActionKind.LOGIN: {
			if (payload) {
				state = payload;
				localStorage.setItem(USER_DATA_KEY, JSON.stringify(state));
			}
			break;
		}
		case UserActionKind.LOGOUT: {
			localStorage.removeItem(USER_DATA_KEY);
			state = userInitialState;
			break;
		}
	}
	return state;
};
