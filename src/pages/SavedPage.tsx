import ListingCardGrid from "../components/listings/ListingCardGrid";
import { ListingCardData } from "../utils/Interfaces";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../state-management/contexts/UserContext";

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
				console.log(result.data);
				setSavedListings(result.data as ListingCardData[]);
			})
			.catch((error) => {
				console.log(error);
				navigate("/");
			})
	}, [userState]);

	return (<ListingCardGrid dataList={savedListings} />)
}

export default SavedPage;
