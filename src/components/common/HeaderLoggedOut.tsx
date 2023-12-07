import { HeaderData } from "./Header";
import { RouteNames } from "../../utils/RoutesInfo";
import { NavLink } from "react-router-dom";

function HeaderLoggedOut({ loggedIn }: HeaderData) {
    if (loggedIn) {
        return null;
    }

    return (
        <>
            <NavLink to={RouteNames.LOGIN} className={"nav-link"}>Login</NavLink>
            <NavLink to={RouteNames.REGISTER} className={"nav-link"}>Register</NavLink>
        </>
    )
}

export default HeaderLoggedOut;