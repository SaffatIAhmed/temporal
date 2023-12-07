import Container from "react-bootstrap/esm/Container";
import { ListingCardData } from "../../utils/Interfaces";
import ListingCard from "./ListingCard";
import FilterSelect from "./FilterSelect";
import FilterField from "./FilterField";

interface ListingCardGridProps {
	dataList: ListingCardData[];
}

function ListingCardGrid(props: ListingCardGridProps) {
	return (
		<Container
			fluid
			style={{
				maxWidth: 1144,
				marginTop: 48,
				marginBottom: 96,
				padding: 0,
			}}
		>
			<div
				style={{
					marginBottom: 32,
					display: "flex",
					flexWrap: "wrap",
					gap: 16,
				}}
			>
				<FilterField label="Min. Rent" />
				<FilterField label="Max. Rent" />
				<FilterSelect
					label="Type of Place"
					options={[
						{ title: "Apartment", value: "apartment" },
						{ title: "House", value: "house" },
						{ title: "Condo", value: "condo" },
					]}
				/>
				<FilterSelect
					label="Pet Friendly"
					options={[
						{ title: "Yes", value: true },
						{ title: "No", value: false },
					]}
				/>
				<FilterSelect
					label="Smoke Friendly"
					options={[
						{ title: "Yes", value: true },
						{ title: "No", value: false },
					]}
				/>
			</div>
			<div
				style={{
					display: "grid",
					gridTemplateColumns:
						"repeat(auto-fit, minmax(360px, max-content))",
					justifyContent: "center",
					gap: 32,
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
