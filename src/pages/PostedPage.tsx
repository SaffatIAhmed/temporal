import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import ListingCardGrid from "../components/listings/ListingCardGrid";
import { UserContext } from "../state-management/contexts/UserContext";
import { type ListingCardData, ListingContext } from "../utils/Interfaces";
import { useNavigate } from "react-router";
import { UserState } from "../state-management/reducers/UserReducer";

const PostedListingContext = createContext<ListingContext>({
	state: [],
	handlers: {},
	canEdit: () => false,
	canDelete: () => false,
	canSave: () => false,
	canCheckout: () => false,
});

function PostedPage() {
	const navigate = useNavigate();
	const userState = useContext(UserContext);
	const [postedListings, setPostedListings] = useState<ListingCardData[]>([]);

	useEffect(() => {
		if (userState.id == null) {
			return navigate("/");
		}

		axios.get(`http://localhost:3000/users/${userState.id}/posted`, { withCredentials: true })
			.then(result => {
				console.log(result.data);
				setPostedListings(result.data as ListingCardData[]);
			})
			.catch((error) => {
				console.log(error);
				navigate("/");
			})
	},
		[userState]);

	const canEditDelete = (user: UserState, listing: ListingCardData) => user.id === listing.postedBy
	const canSaveCheckout = () => false;

	return (
		<PostedListingContext.Provider value={{
			state: postedListings,
			handlers: {},
			canEdit: canEditDelete,
			canDelete: canEditDelete,
			canSave: canSaveCheckout,
			canCheckout: canSaveCheckout,
		}}>
			<ListingCardGrid context={PostedListingContext} />
		</PostedListingContext.Provider>
	)
}

export default PostedPage;
