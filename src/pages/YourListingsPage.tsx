import ListingCardGrid from "../components/ListingCardGrid";
import Header from "../components/Header";
import { ListingCardData } from "../utils/Interfaces";

function YourListingsPage() {
    const dummyData: ListingCardData[] = [
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

    return (
        <>
            <ListingCardGrid dataList={dummyData} />
        </>
    );
}

export default YourListingsPage;
