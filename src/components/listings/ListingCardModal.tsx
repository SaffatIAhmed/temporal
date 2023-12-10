import { Row, Col, Modal, Carousel, Image, Placeholder } from "react-bootstrap";
import { CartFill, Star } from "react-bootstrap-icons";
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
	//const picID = Number(state[props.index]._id.substring(0,2));
	const picID = state[props.index].rent % 1000;

	const checkoutApartment = async (index: number) => {
		try {
			await axios.delete(`http://localhost:3000/listings/${index}`, { withCredentials: true });
			setIsCheckoutModalOpen(false);
			if (handlers.Set) {
				handlers.Set(state.filter((_elem, index) => index !== props.index));
			}
		} catch (err) {
			console.log(err);
		}
	}

	// function convertBoolean(input?: boolean) {
	// 	return (input ? "Yes" : "No");
	// }

	function convertDate(input: string) {
		const curDate = new Date(input);

		return curDate.getMonth() + "/" + curDate.getDate() + "/" + curDate.getFullYear();
	}

	return (
		<>
			<Modal show={props.showModal} onHide={props.handleClose} size="lg">
				<Modal.Header closeButton>
					<Modal.Title style={{ marginBlock: -8, fontWeight: "bold" }}>
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
									src={`https://picsum.photos/id/${picID + 1
										}/640/360`}
									rounded
								/>
							</Carousel.Item>
							<Carousel.Item>
								<Image
									src={`https://picsum.photos/id/${picID + 2
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
								icon={<Star size={24} />}
								onClick={function (): {} {
									throw new Error("Function not implemented.");
								}}
							>
								Save
							</ThemeButton>

							<ThemeButton
								icon={<CartFill size={24} />}
								onClick={() => {
									setIsCheckoutModalOpen(true);
								}}
							>
								Make Payment
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
									<div>Utilities: </div>
									<div>${state[props.index].utilities}</div>
									<div>Bedrooms: </div>
									<div>{state[props.index].bedrooms}</div>
									<div>Bathrooms: </div>
									<div>{state[props.index].bedrooms}</div>
									<div>Preferred Gender: </div>
									<div>{state[props.index].prefGender}</div>
									<div>Start Date:</div>
									<div>{convertDate(state[props.index].moveInDate)}</div>
									<div>End Date:</div>
									<div>{convertDate(state[props.index].moveOutDate)}</div>
								</div >
							</Col >
							{/* <Col>
								<div>
									<b>Amenities</b>
									<hr style={{ marginBlock: 8 }} />
									<ul
										style={{
											marginTop: 12,
										}}
									>
										<li>Heating & Cooling: {convertBoolean(state[props.index].heatingCooling)}</li>
										<li>Laundry & Dryer: {convertBoolean(state[props.index].laundryDryer)}</li>
										<li>Internet: {convertBoolean(state[props.index].internet)}</li>
										<li>Car Parking: {convertBoolean(state[props.index].carParking)}</li>
										<li>TV: {convertBoolean(state[props.index].tv)}</li>
										<li>Gym: {convertBoolean(state[props.index].gym)}</li>
										<li>Pool: {convertBoolean(state[props.index].pool)}</li>
										<li>Patio: {convertBoolean(state[props.index].patio)}</li>
										<li>Bathtub: {convertBoolean(state[props.index].bath)}</li>
									</ul >
								</div >
							</Col > */}
							{/* <Col>
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
									<div>Pets Allowed?:</div>
									<div>{convertBoolean(state[props.index].allowedPets)}</div>
									<div>Smoking Allowed?</div>
									<div>{convertBoolean(state[props.index].allowedSmoking)}</div>
									<div>Guests Allowed?</div>
									<div>{convertBoolean(state[props.index].allowedGuests)}</div>
									<div>Quiet Hours Start:</div>
									<div>{state[props.index].quietHoursStart}</div>
									<div>Quiet Hours Until:</div>
									<div>{state[props.index].quietHoursEnd}</div>
								</div >
							</Col > */}
						</Row >
					</div >
				</Modal.Body >
			</Modal >
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
