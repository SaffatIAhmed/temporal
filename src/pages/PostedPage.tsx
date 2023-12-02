import ListingCardGrid from "../components/ListingCardGrid";
import { ListingCardData } from "../utils/Interfaces";

function PostedPage() {
	const dummyData: ListingCardData[] = [
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
