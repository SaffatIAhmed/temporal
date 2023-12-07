import ListingCardGrid from "../components/listings/ListingCardGrid";
import { ListingCardData } from "../utils/Interfaces";

function PostedPage() {
	const dummyData: ListingCardData[] = [
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
	];

	return <ListingCardGrid dataList={dummyData} />;
}

export default PostedPage;
