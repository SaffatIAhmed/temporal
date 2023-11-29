import Container from "react-bootstrap/esm/Container";
import { ListingCardData } from "../utils/Interfaces";
import ListingCard from "./ListingCard";

interface ListingCardGridProps {
	dataList: ListingCardData[];
}

function ListingCardGrid(props: ListingCardGridProps) {
	return (
		<Container fluid style={{ width: 1168, marginTop: 32 }}>
			<div
				style={{
					display: "grid",
					gridAutoRows: "1fr",
					gridTemplateColumns: "360px 360px 360px",
					gap: "48px 32px",
				}}
			>
				{props.dataList.map((listing, index) => {
					return <ListingCard key={index} data={listing} />;
				})}
			</div>
		</Container>
	);
}

export default ListingCardGrid;
