import { Row, Col, Placeholder, Card } from "react-bootstrap";
import { ChatLeftTextFill, Star } from "react-bootstrap-icons";
import IconButton from "./IconButton";
import { ListingCardData } from "../utils/Interfaces";
import { useState } from "react";
import ListingCardModal from "./ListingCardModal";

interface ListingCardProps {
	data: ListingCardData;
}

function ListingCard({ data: props }: ListingCardProps) {
	const [imgLoading, setImgLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<Card style={{ width: 360 }} onClick={() => setIsModalOpen(true)}>
				<Card.Img
					variant="top"
					src="https://picsum.photos/360/240"
					onLoad={() => setImgLoading(false)}
				/>
				{imgLoading && (
					<Placeholder
						as={Card.Img}
						style={{ width: 358, height: 239 }}
					/>
				)}
				<Card.Body>
					<Row>
						<Col sm={10}>
							<Row>
								<span
									style={{
										color: "#154734",
										fontWeight: "bold",
									}}
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
									icon={<Star size={24} />}
									onClick={function (): {} {
										throw new Error(
											"Function not implemented."
										);
									}}
								/>
							</Row>
							<Row>
								<IconButton
									icon={<ChatLeftTextFill size={24} />}
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

			<ListingCardModal
				data={props}
				showModal={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
			/>
		</>
	);
}

export default ListingCard;
