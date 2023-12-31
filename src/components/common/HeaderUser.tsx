import { Nav } from "react-bootstrap";
import { HeaderData } from "./Header";
import { RouteNames } from "../../utils/RoutesInfo";
import { useContext } from "react";
import { UserDispatchContext } from "../../state-management/contexts/UserContext";
import { UserActionKind } from "../../state-management/reducers/UserReducer";
import CreateListingModal from "../listings/CreateListingModal";
import { NavLink } from "react-router-dom";

function HeaderUser({ loggedIn, moderator }: HeaderData) {
    if (!loggedIn || moderator) {
        return null;
    }

    const dispatch = useContext(UserDispatchContext);

    const handleLogout = () => {
        dispatch({ type: UserActionKind.LOGOUT });
    }

    return (
        <>
            < CreateListingModal />
            <NavLink to={RouteNames.POSTED} className={"nav-link"}>Posted</NavLink>
            <NavLink to={RouteNames.SAVED} className={"nav-link"}>Saved</NavLink>
            <button className='nav-link' onClick={handleLogout}>Logout</button>
        </>
    )
}

export default HeaderUser;