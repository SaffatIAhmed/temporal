import { Row, Col, Placeholder, Card } from "react-bootstrap";
import {
	CartFill,
	PencilFill,
	Star,
	StarFill,
	TrashFill,
} from "react-bootstrap-icons";
import { ListingCardData, ListingContext } from "../../utils/Interfaces";
import { useContext, useState } from "react";
import ListingCardModal from "./ListingCardModal";
import CheckoutModal from "./CheckoutModal";
import IconButton from "../base/IconButton";
import DeleteModel from "./DeleteModal";
import CreateListingModal from "./CreateListingModal";
import axios from "axios";
import { UserContext } from "../../state-management/contexts/UserContext";

interface ListingCardProps {
	context: React.Context<ListingContext>;
	data: ListingCardData;
	index: number;
	canEdit: boolean;
	canDelete: boolean;
	canSave: boolean;
	canCheckout: boolean;
}

function ListingCard(props: ListingCardProps) {
	const [imgLoading, setImgLoading] = useState(true);
	const [isSaved, setIsSaved] = useState(props.data.isSaved);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isCreateModelOpen, setCreateModalOpen] = useState(false);
	const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

	const { id: userId } = useContext(UserContext);

	const picID = (props.data.id * 10) % 1000;

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
							{props.canSave && (
								<IconButton
									onClick={e => {
										e.stopPropagation();
										if (userId) {
											axios
												.put(
													`http://localhost:3000/users/${userId}/save`,
													{
														lid: 5, //props.data.id,
														save: true, //!isSaved,
													},
													{ withCredentials: true }
												)
												.then(res => {
													setIsSaved(!isSaved);
													console.log(res);
												});
										}
									}}
								>
									{isSaved ? (
										<StarFill size={24} />
									) : (
										<Star size={24} />
									)}
								</IconButton>
							)}
							{props.canCheckout && (
								<IconButton
									onClick={e => {
										e.stopPropagation();
										setIsCheckoutModalOpen(true);
									}}
								>
									<CartFill size={24} />
								</IconButton>
							)}
							{props.canEdit && (
								<IconButton
									onClick={e => {
										e.stopPropagation();
										setCreateModalOpen(true);
									}}
								>
									<PencilFill size={24} />
								</IconButton>
							)}
							{props.canDelete && (
								<IconButton
									onClick={e => {
										e.stopPropagation();
										setIsDeleteModalOpen(true);
									}}
								>
									<TrashFill size={24} />
								</IconButton>
							)}
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
			<CreateListingModal
				data={props.data}
				showModal={isCreateModelOpen}
				handleClose={() => setCreateModalOpen(false)}
			/>
			<DeleteModel
				data={props.data}
				showModal={isDeleteModalOpen}
				handleClose={() => setIsDeleteModalOpen(false)}
			/>
		</>
	);
}

export default ListingCard;
