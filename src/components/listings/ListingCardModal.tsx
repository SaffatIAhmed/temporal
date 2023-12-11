import { Row, Col, Modal, Carousel, Image, Placeholder } from "react-bootstrap";
import { CartFill, Star, StarFill } from "react-bootstrap-icons";
import { ListingCardData, ListingContext } from "../../utils/Interfaces";
import CheckoutModal from "./CheckoutModal";
import ThemeButton from "../base/ThemedButton";
import { useState, useContext } from "react";
import axios from "axios";

interface ListingCardModalProps {
	context: React.Context<ListingContext>;
	data: ListingCardData;
	index: number;
	showModal: boolean;
	handleClose: () => any;
}

function ListingCardModal(props: ListingCardModalProps) {
	const { state, handlers } = useContext<ListingContext>(props.context);
	const [imgLoading, setImgLoading] = useState(true);
	const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

	const picID = (state[props.index].rent * 10) % 1000;

	const checkoutApartment = async (index: number) => {
		try {
			await axios.delete(`http://localhost:3000/listings/${index}`, {
				withCredentials: true,
			});
			setIsCheckoutModalOpen(false);
			if (handlers.Set) {
				handlers.Set(
					state.filter((_elem, index) => index !== props.index)
				);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Modal show={props.showModal} onHide={props.handleClose} size="lg">
				<Modal.Header closeButton>
					<Modal.Title
						style={{ marginBlock: -8, fontWeight: "bold" }}
					>
						{state[props.index].street +
							", " +
							state[props.index].city +
							" " +
							state[props.index].state}
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ padding: 32 }}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 16,
						}}
					>
						<Carousel>
							<Carousel.Item>
								<Image
									src={`https://picsum.photos/id/${picID}/640/360`}
									onLoad={() => setImgLoading(false)}
									rounded
								/>
								{imgLoading && (
									<Placeholder
										as={Image}
										style={{ width: 640, height: 360 }}
									/>
								)}
							</Carousel.Item>
							<Carousel.Item>
								<Image
									src={`https://picsum.photos/id/${
										picID + 1
									}/640/360`}
									rounded
								/>
							</Carousel.Item>
							<Carousel.Item>
								<Image
									src={`https://picsum.photos/id/${
										picID + 2
									}/640/360`}
									rounded
								/>
							</Carousel.Item>
						</Carousel>
						<div
							style={{
								marginBottom: 32,
								display: "flex",
								gap: 32,
							}}
						>
							<ThemeButton
								icon={
									state[props.index].isSaved ? (
										<StarFill size={24} />
									) : (
										<Star size={24} />
									)
								}
								onClick={function (): {} {
									throw new Error(
										"Function not implemented."
									);
								}}
							>
								{state[props.index].isSaved ? "Save" : "Unsave"}
							</ThemeButton>
							<ThemeButton
								icon={<CartFill size={24} />}
								onClick={function (): {} {
									throw new Error(
										"Function not implemented."
									);
								}}
							>
								Checkout
							</ThemeButton>
						</div>
						<Row style={{ width: "100%" }}>
							<Col>
								<b>Your Room</b>
								<hr style={{ marginBlock: 8 }} />
								<div
									style={{
										display: "grid",
										gridAutoRows: "1fr",
										gridTemplateColumns: "120px 100px",
										gap: "6px 0px",
									}}
								>
									<div>Rent:</div>
									<div>${state[props.index].rent}</div>
									<div>Utilities:</div>
									<div>${state[props.index].utilities}</div>
									<div>Bedrooms:</div>
									<div>{state[props.index].bedrooms}</div>
									<div>Bathrooms:</div>
									<div>{state[props.index].bedrooms}</div>
									<div>Private:</div>
									<div>
										{state[props.index].isPrivateRoom
											? "Yes"
											: "No"}
									</div>
									<div>Preferred: </div>
									<div>{state[props.index].prefGender}</div>
								</div>
							</Col>
							<Col>
								<div>
									<b>Amenities</b>
									<hr style={{ marginBlock: 8 }} />
									<ul
										style={{
											marginTop: 12,
										}}
									>
										{state[props.index].heatingCooling && (
											<li>Heating/Cooling</li>
										)}
										{state[props.index].laundryDryer && (
											<li>Laundry/Dryer</li>
										)}
										{state[props.index].internet && (
											<li>Heating/Cooling</li>
										)}
										{state[props.index].carParking && (
											<li>Car Parking</li>
										)}
										{state[props.index].tv && <li>TV</li>}
										{state[props.index].gym && <li>Gym</li>}
										{state[props.index].pool && (
											<li>Pool</li>
										)}
										{state[props.index].patio && (
											<li>Patio</li>
										)}
										{state[props.index].bath && (
											<li>Bath</li>
										)}
									</ul>
								</div>
							</Col>
							<Col>
								<b>Policies</b>
								<hr style={{ marginBlock: 8 }} />
								<div
									style={{
										display: "grid",
										gridAutoRows: "1fr",
										gridTemplateColumns: "120px 100px",
										gap: "6px 0px",
									}}
								>
									<div>Move In</div>
									<div>
										{state[
											props.index
										].moveInDate.substring(0, 10)}
									</div>
									<div>Move Out</div>
									<div>
										{state[
											props.index
										].moveOutDate.substring(0, 10)}
									</div>
									<div>Pet Friendly:</div>
									<div>
										{state[props.index].allowedPets
											? "Yes"
											: "No"}
									</div>
									<div>Smoking:</div>
									<div>
										{state[props.index].allowedSmoking
											? "Yes"
											: "No"}
									</div>
									<div>Guests:</div>
									<div>
										{state[props.index].allowedGuests
											? "Yes"
											: "No"}
									</div>
									<div>Quiet Hours:</div>
									{state[props.index].quietHoursStart &&
										state[props.index].quietHoursEnd && (
											<>
												<div>
													{state[
														props.index
													].quietHoursStart?.substring(
														0,
														5
													) + " until"}
												</div>
												<div></div>
												<div>
													{state[
														props.index
													].quietHoursEnd?.substring(
														0,
														5
													)}
												</div>
											</>
										)}
								</div>
							</Col>
						</Row>
					</div>
				</Modal.Body>
			</Modal>

			<CheckoutModal
				context={props.context}
				data={state[props.index]}
				showModal={isCheckoutModalOpen}
				handleClose={() => {
					checkoutApartment(state[props.index].id);
					props.handleClose();
				}}
			/>
		</>
	);
}

export default ListingCardModal;
