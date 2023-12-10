import { useContext, useEffect, useState } from "react";
import ListingCardGrid from "../components/listings/ListingCardGrid";
import { UserContext } from "../state-management/contexts/UserContext";
import { ListingCardData } from "../utils/Interfaces";
import { useNavigate } from "react-router";
import axios from "axios";

function PostedPage() {
	const navigate = useNavigate();
	const [postedListings, setPostedListings] = useState<ListingCardData[]>([]);
	const userState = useContext(UserContext)
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
		[userState])
	return (<ListingCardGrid dataList={postedListings} />)
}

export default PostedPage;
