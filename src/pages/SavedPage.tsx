import ListingCardGrid from "../components/listings/ListingCardGrid";
import { ListingCardData } from "../utils/Interfaces";
import FetchData from "../components/common/FetchData";
import React, { Component, useState, useEffect } from "react";

function SavedPage() {
	const [fetchedData, setData] = useState<ListingCardData[]>([]);
	/*
	const dummyData: ListingCardData[] = [
		{
			id: 60,
			address: {
				street: "3000 Northside Boulevard",
				neighborhood: "University Village",
				city: "Richardson",
				state: "TX",
			},
			rent: 730,
			isAvaliable: true,
		},
		{
			id: 70,
			address: {
				street: "4555 Red Bard Drive",
				neighborhood: "UBreckenridge",
				city: "Richardson",
				state: "TX",
			},
			rent: 900,
			isAvaliable: true,
		},
		{
			id: 80,
			address: {
				street: "672 Matthew Place",
				neighborhood: "Telecom Corridor",
				city: "Richardson",
				state: "TX",
			},
			rent: 1000,
			isAvaliable: true,
		},
		{
			id: 90,
			address: {
				street: "1114 Ridgeway Circle",
				neighborhood: "Cottonwood Heights",
				city: "Richardson",
				state: "TX",
			},
			rent: 1125,
			isAvaliable: true,
		},
		{
			id: 100,
			address: {
				street: "672 Matthew Place",
				neighborhood: "Telecom Corridor",
				city: "Richardson",
				state: "TX",
			},
			rent: 1000,
			isAvaliable: true,
		},
	];
	*/

	useEffect(() => {
		//Change to users saved listings
		FetchData('http://localhost:3000/listings')
		.then(([data]) => {
			setData(data);
			//console.log(fetchedData);
		});
	  }, []);

	return <ListingCardGrid dataList={fetchedData} />;
}

export default SavedPage;
