import ListingCardGrid from "../components/listings/ListingCardGrid";
import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { ListingCardData, ListingContext } from "../utils/Interfaces";
import { UserState } from "../state-management/reducers/UserReducer";
import { UserContext } from "../state-management/contexts/UserContext";

const AllListingContext = createContext<ListingContext>({
	state: [],
	handlers: {},
	canEdit: () => false,
	canDelete: () => false,
	canSave: () => false,
	canCheckout: () => false,
});

function BrowsePage() {
	const { id } = useContext(UserContext);
	const [allListings, setAllListings] = useState<ListingCardData[]>([]);
	const [query, setQuery] = useState({});
	useEffect(() => {
		let queryString = "";
		if (query) {
			for (const [k, v] of Object.entries(query)) {
				queryString += `${k}=${v}&`
			}
		}
		axios
			.get(`http://localhost:3000/listings?${queryString}`, { withCredentials: true })
			.then(result => {
				const fetchedListings: ListingCardData[] = result.data;
				setAllListings(fetchedListings);
				if (id) {
					axios
						.get(`http://localhost:3000/users/${id}/saved`, {
							withCredentials: true,
						})
						.then(res => {
							if (res.data.length > 0) {
								const savedListings =
									res.data as ListingCardData[];
								savedListings.forEach(listing => {
									const savedIndex =
										fetchedListings.findIndex(
											elem => elem.id === listing.id
										);
									fetchedListings[savedIndex].isSaved = true;
								});
								setAllListings(fetchedListings);
							}
						})
						.catch(err => {
							console.log(err);
						});
				} else {
					setAllListings(
						fetchedListings.map(listing => {
							listing.isSaved = false;
							return listing;
						})
					);
				}
			})
			.catch(error => {
				console.log(error);
			});
	}, [id, query]);

	const canEditDelete = (user: UserState, listing: ListingCardData) =>
		user.role === "moderator" || user.id === listing.postedBy;
	const canSaveCheckout = (user: UserState, listing: ListingCardData) =>
		user.role === "user" && user.id !== listing.postedBy;

	const onQueryChanged = (query: object) => {
		setQuery(query);
	}

	return (
		<AllListingContext.Provider
			value={{
				state: allListings,
				handlers: {
					Filter: onQueryChanged
				},
				canEdit: canEditDelete,
				canDelete: canEditDelete,
				canSave: canSaveCheckout,
				canCheckout: canSaveCheckout,
			}}
		>
			<ListingCardGrid context={AllListingContext} />
		</AllListingContext.Provider>
	);
}

export default BrowsePage;
