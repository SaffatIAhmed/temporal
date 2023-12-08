import { Row, Col, Placeholder, Card } from "react-bootstrap";
import { CartFill, Star } from "react-bootstrap-icons";
import { ListingCardData } from "../../utils/Interfaces";
import { useState } from "react";
import ListingCardModal from "./ListingCardModal";
import CheckoutModal from "./CheckoutModal";
import IconButton from "../base/IconButton";

interface ListingCardProps {
	data: ListingCardData;
}

function ListingCard({ data: props }: ListingCardProps) {
	const [imgLoading, setImgLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

	return (
		<>
			<Card
				style={{ width: 360, cursor: "pointer" }}
				onClick={() => setIsModalOpen(true)}
			>
				<Card.Img
					variant="top"
					src={`https://picsum.photos/id/${props.id}/360/240`}
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
							<div
								style={{
									color: "#154734",
									fontWeight: "bold",
								}}
							>
								{props.address.street}
							</div>
							<div>
								{props.address.neighborhood +
									" • " +
									props.address.city +
									", " +
									props.address.state}
							</div>
							<div>
								<b>${props.rent}</b> • Available Now
							</div>
						</Col>
						<Col sm={2} style={{ cursor: "default" }}>
							<IconButton
								icon={<Star size={24} />}
								onClick={function (): {} {
									throw new Error(
										"Function not implemented."
									);
								}}
							/>
							<IconButton
								icon={<CartFill size={24} />}
								onClick={() => {
									setIsCheckoutModalOpen(true);
									return {};
								}}
							/>
						</Col>
					</Row>
				</Card.Body>
			</Card>

			<ListingCardModal
				data={props}
				showModal={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
			/>
			<CheckoutModal
				data={props}
				showModal={isCheckoutModalOpen}
				handleClose={() => setIsCheckoutModalOpen(false)}
			/>
		</>
	);
}

export default ListingCard;
