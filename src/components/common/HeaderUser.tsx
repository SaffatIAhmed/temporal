import { HeaderData } from "./Header";
import { RouteNames } from "../../utils/RoutesInfo";
import { useContext, useState } from "react";
import { UserDispatchContext } from "../../state-management/contexts/UserContext";
import { UserActionKind } from "../../state-management/reducers/UserReducer";
import CreateListingModal from "../listings/CreateListingModal";
import { NavLink } from "react-router-dom";

function HeaderUser({ loggedIn, moderator }: HeaderData) {
	const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

	if (!loggedIn || moderator) {
		return null;
	}

	const dispatch = useContext(UserDispatchContext);

	const handleLogout = async () => {
		const result = await fetch("http://localhost:3000/users/logout", {
			method: "post",
		});
		if (result.ok) {
			dispatch({ type: UserActionKind.LOGOUT });
		}
	};

	return (
		<>
			<button
				className="nav-link"
				onClick={() => setIsCreateModalOpen(true)}
			>
				Create Listing
			</button>
			<NavLink to={RouteNames.POSTED} className={"nav-link"}>
				Posted
			</NavLink>
			<NavLink to={RouteNames.SAVED} className={"nav-link"}>
				Saved
			</NavLink>
			<button className="nav-link" onClick={handleLogout}>
				Logout
			</button>

			<CreateListingModal
				showModal={isCreateModalOpen}
				handleClose={() => setIsCreateModalOpen(false)}
			/>
		</>
	);
}

export default HeaderUser;
