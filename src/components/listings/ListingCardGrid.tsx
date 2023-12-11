import Container from "react-bootstrap/esm/Container";
import ListingCard from "./ListingCard";
import FilterSelect from "./FilterSelect";
import FilterField from "./FilterField";
import { Form } from "react-bootstrap";
import { useContext } from "react";
import { ListingContext } from "../../utils/Interfaces";
import { UserContext } from "../../state-management/contexts/UserContext";

interface ListingCardGridProps {
	context: React.Context<ListingContext>;
}

function ListingCardGrid(props: ListingCardGridProps) {
	const { state, canEdit, canSave, canCheckout, canDelete } =
		useContext<ListingContext>(props.context);
	const userState = useContext(UserContext);

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
					marginBottom: 16,
					display: "flex",
					gap: 16,
				}}
			>
				<span style={{ fontSize: 24, whiteSpace: "nowrap" }}>
					Found {state.length} listings in Richardson, TX
				</span>
				<Form.Control placeholder="Search other locations..." />
			</div>
			<div
				style={{
					width: "100%",
					marginBottom: 32,
					display: "flex",
					flexWrap: "wrap",
					gap: 16,
				}}
			>
				<FilterField label="Avaliable Start" type="date" />
				<FilterField label="Avaliable Until" type="date" />
				<FilterField label="Min. Rent" />
				<FilterField label="Max. Rent" />
				<FilterSelect label="Pet Friendly" />
				<FilterSelect label="Smoke Friendly" />
				<FilterSelect label="Guest Friendly" />
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
				{state.map((listing, index) => {
					return (
						<ListingCard
							key={index}
							index={index}
							data={listing}
							context={props.context}
							canEdit={canEdit(userState, listing)}
							canDelete={canDelete(userState, listing)}
							canSave={canSave(userState, listing)}
							canCheckout={canCheckout(userState, listing)}
						/>
					);
				})}
			</div>
		</Container>
	);
}

export default ListingCardGrid;
