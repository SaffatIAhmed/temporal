import { Row, Col, Placeholder, Card } from "react-bootstrap";
import { CartFill, Pencil, Star, StarFill, Trash2Fill } from "react-bootstrap-icons";
import { ListingCardData, ListingContext } from "../../utils/Interfaces";
import { useState } from "react";
import ListingCardModal from "./ListingCardModal";
import CheckoutModal from "./CheckoutModal";
import IconButton from "../base/IconButton";

interface ListingCardProps {
	context: React.Context<ListingContext>,
	data: ListingCardData;
	index: number;
	canEdit: boolean;
	canDelete: boolean;
	canSave: boolean;
	canCheckout: boolean;
}

function ListingCard(props: ListingCardProps) {
	const { canEdit, canDelete, canSave, canCheckout } = props;
	const [imgLoading, setImgLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
	const picID = props.data.rent % 1000;

	return (
		<>
			<Card
				style={{ width: 360, cursor: "pointer" }}
				onClick={() => setIsModalOpen(true)}
			>
				<Card.Img
					variant="top"
					src={`https://picsum.photos/id/${picID}/360/240`}
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
								{props.data.street}
							</div>
							<div>
								{props.data.street +
									" • " +
									props.data.city +
									", " +
									props.data.state}
							</div>
							<div>
								<b>${props.data.rent}</b> • Available Now
							</div>
						</Col>
						<Col sm={2} style={{ cursor: "default" }}>
							{canSave && <IconButton>
								{
									props.data.isSaved
										? <StarFill size={24} />
										: <Star size={24} />
								}
							</IconButton>}
							{canCheckout && <IconButton>
								<CartFill size={24} />
							</IconButton>}
							{canEdit && <IconButton>
								<Pencil size={24} />
							</IconButton>}
							{canDelete && <IconButton>
								<Trash2Fill size={24} />
							</IconButton>}
						</Col>
					</Row>
				</Card.Body>
			</Card>

			<ListingCardModal
				index={props.index}
				context={props.context}
				data={props.data}
				showModal={isModalOpen}
				handleClose={() => setIsModalOpen(false)}
			/>
			<CheckoutModal
				context={props.context}
				data={props.data}
				showModal={isCheckoutModalOpen}
				handleClose={() => setIsCheckoutModalOpen(false)}
			/>
		</>
	);
}

export default ListingCard;
