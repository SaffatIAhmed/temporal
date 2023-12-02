import React, { useState, useEffect } from 'react';
import ListingCardGrid from "../components/ListingCardGrid";
import Header from "../components/Header";
import { ListingCardData } from "../utils/Interfaces";

function BrowsePage() {
	
	const dummyData: ListingCardData[] = [
		{
			address: {
				street: "2600 East Renner Road",
				neighborhood: "Crowley Park",
				city: "Richardson",
				state: "TX",
			},
			rent: 730,
			isAvaliable: true,
		},
		{
			address: {
				street: "601 Dover Drive",
				neighborhood: "Cottonwood Heights",
				city: "Richardson",
				state: "TX",
			},
			rent: 1200,
			isAvaliable: true,
		},
		{
			address: {
				street: "1903 North Waterview Drive",
				neighborhood: "J. J. Pierce",
				city: "Richardson",
				state: "TX",
			},
			rent: 800,
			isAvaliable: true,
		},
		{
			address: {
				street: "1913 Eastfield Drive",
				neighborhood: "Berkner Park",
				city: "Richardson",
				state: "TX",
			},
			rent: 1500,
			isAvaliable: true,
		},
		{
			address: {
				street: "2090 East Arapaho Road",
				neighborhood: "Duck Creek",
				city: "Richardson",
				state: "TX",
			},
			rent: 500,
			isAvaliable: true,
		},
		{
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

	const [fetchedData, setFetchedData] = useState(null);

	useEffect(() => {
	  const fetchDataAsync = async () => {
		const data = await fetchData();
		setFetchedData(data);
	  };
  
	  fetchDataAsync();
	}, []);


	console.log(fetchedData);
	


	return (
		<>
			<Header />
			<ListingCardGrid dataList={dummyData} />
		</>
	);
}

async function fetchData() {
	let jsondata;
  
	try {
	  const response = await fetch('http://localhost:3000/listings');
	  jsondata = await response.json();
	  //console.log(jsondata);
	  return jsondata

	} catch (error) {
	  console.error('Error fetching data:', error);
	}
  }
  



export default BrowsePage;
 