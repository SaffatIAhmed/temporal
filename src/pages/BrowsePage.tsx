import ListingCardGrid from "../components/listings/ListingCardGrid";
import { ListingCardData } from "../utils/Interfaces";

function BrowsePage() {
	const dummyData: ListingCardData[] = [
		{
			id: 10,
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
			id: 20,
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
			id: 30,
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
			id: 40,
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
			id: 50,
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

	return <ListingCardGrid dataList={dummyData} />;
}

export default BrowsePage;
