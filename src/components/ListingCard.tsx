import { Row, Col, Placeholder } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import IconButton from "./IconButton";
import { ListingCardData } from "../utils/Interfaces";
import { useState } from "react";

interface ListingCardProps {
	data: ListingCardData;
}

function ListingCard({ data: props }: ListingCardProps) {
	const [imgLoading, setImgLoading] = useState(true);

	return (
		<Card style={{ width: 320 }}>
			<Card.Img
				variant="top"
				src="https://picsum.photos/320/240"
				onLoad={() => setImgLoading(false)}
			/>
			{imgLoading && (
				<Placeholder
					as={Card.Img}
					style={{ width: 318, height: 239 }}
				/>
			)}
			<Card.Body>
				<Row>
					<Col sm={10}>
						<Row>
							<span
								style={{ color: "#154734", fontWeight: "bold" }}
							>
								{props.address.street}
							</span>
						</Row>
						<Row>
							<span>
								{props.address.neighborhood} •{" "}
								{props.address.city}, {props.address.state}
							</span>
						</Row>
						<Row>
							<span>
								<b>${props.rent}</b> • Available Now
							</span>
						</Row>
					</Col>
					<Col sm={2}>
						<Row>
							<IconButton
								iconName="star"
								onClick={function (): {} {
									throw new Error(
										"Function not implemented."
									);
								}}
							/>
						</Row>
						<Row>
							<IconButton
								iconName="chat-left-text"
								onClick={function (): {} {
									throw new Error(
										"Function not implemented."
									);
								}}
							/>
						</Row>
					</Col>
				</Row>
			</Card.Body>
		</Card>
	);
}

export default ListingCard;
