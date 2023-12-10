import { useNavigate } from "react-router";
import ListingCardGrid from "../components/listings/ListingCardGrid";
import { ListingCardData } from "../utils/Interfaces";
import axios from "axios";
import { useState, useEffect } from "react";

function BrowsePage() {
	const navigate = useNavigate();
	const [allListings, setAllListings] = useState<ListingCardData[]>([]);
	useEffect(() => {
		axios.get(`http://localhost:3000/listings`, { withCredentials: true })
			.then(result => {
				setAllListings(result.data as ListingCardData[]);
			})
			.catch((error) => {
				console.log(error);
				navigate("/");
			})
	}, []);


	/*
	const dummyData: ListingCardData[] = [
		{
			_id: 123,
			postedBy: "6549cf50a4c97802fed8ccd1",
			title: "New Accommodation available",
			apartmentNumber: "1122",
			address:"Post Office Street",
			city: "Frisco",
			state: "TX",
			zipcode:"75080",
			bedrooms: "1",
			bathrooms:"1", 
			monthlyRent: "950",
			utilitiesAmt: "50",
			listingType: "Permanent",
			startDate: "12-01-2023",
			endDate: "08-01-2024"
		},
	];
	*/


	return <ListingCardGrid dataList={allListings} />;
}



export default BrowsePage;
