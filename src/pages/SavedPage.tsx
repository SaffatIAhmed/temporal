import ListingCardGrid from "../components/listings/ListingCardGrid";
import { ListingCardData, ListingContext } from "../utils/Interfaces";
import { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../state-management/contexts/UserContext";
import { UserState } from "../state-management/reducers/UserReducer";

const SavedListingContext = createContext<ListingContext>({
	state: [],
	handlers: {},
	canEdit: () => false,
	canDelete: () => false,
	canSave: () => false,
	canCheckout: () => false,
});

function SavedPage() {
	const navigate = useNavigate();
	const [savedListings, setSavedListings] = useState<ListingCardData[]>([]);
	const userState = useContext(UserContext)
	useEffect(() => {
		if (userState.id == null) {
			return navigate("/");
		}

		axios.get(`http://localhost:3000/users/${userState.id}/saved`, { withCredentials: true })
			.then(result => {
				const fetchedListings: ListingCardData[] = result.data;
				fetchedListings.map(listing => (listing.isSaved = true));
				setSavedListings(fetchedListings);
			})
			.catch((error) => {
				console.log(error);
				navigate("/");
			})
	}, [userState]);

	const canSaveCheckout = (user: UserState, listing: ListingCardData) => user.id !== listing.postedBy
	const canEditDelete = () => false;

	return (
		<SavedListingContext.Provider value={{
			state: savedListings,
			handlers: {},
			canEdit: canEditDelete,
			canDelete: canEditDelete,
			canSave: canSaveCheckout,
			canCheckout: canSaveCheckout,
		}}>
			<ListingCardGrid context={SavedListingContext} />
		</SavedListingContext.Provider>
	)
}

export default SavedPage;
