import { NavLink } from "react-router-dom";
import { HeaderData } from "./Header";
import { RouteNames } from "../../utils/RoutesInfo";
import { useContext } from "react";
import { UserDispatchContext } from "../../state-management/contexts/UserContext";
import { UserActionKind } from "../../state-management/reducers/UserReducer";

function HeaderModerator({ loggedIn, moderator }: HeaderData) {
    if (!loggedIn || !moderator) {
        return null;
    }

    const dispatch = useContext(UserDispatchContext);

    const handleLogout = async () => {
        const result = await fetch("http://localhost:3000/users/logout",
            {
                method: "post"
            });
        if (result.ok) {
            dispatch({ type: UserActionKind.LOGOUT });
        }
    }

    return (
        <>
            <NavLink to={RouteNames.USERS} className={"nav-link"}>Users</NavLink>
            <button className='nav-link' onClick={handleLogout}>Logout</button>
        </>
    )
}

export default HeaderModerator;