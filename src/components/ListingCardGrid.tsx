import Container from "react-bootstrap/esm/Container";
import { ListingCardData } from "../utils/Interfaces";
import ListingCard from "./ListingCard";

interface ListingCardGridProps {
	dataList: ListingCardData[];
}

function ListingCardGrid(props: ListingCardGridProps) {
	return (
		<Container fluid style={{ width: 1024, marginTop: 32 }}>
			<div
				style={{
					display: "grid",
					gridAutoRows: "1fr",
					gridTemplateColumns: "320px 320px 320px",
					gap: "48px 32px",
				}}
			>
				{props.dataList.map(listing => {
					return <ListingCard data={listing} />;
				})}
			</div>
		</Container>
	);
}

export default ListingCardGrid;
