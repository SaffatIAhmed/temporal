import { Row, Col, Modal, Carousel, Image, Placeholder } from "react-bootstrap";
import { CartFill, Star } from "react-bootstrap-icons";
import { ListingCardData } from "../../utils/Interfaces";
import CheckoutModal from "./CheckoutModal";
import ThemeButton from "../base/ThemedButton";
import { useState } from "react";
import axios from "axios";

interface ListingCardModalProps {
	data: ListingCardData;
	showModal: boolean;
	handleClose: () => any;
}

function ListingCardModal(props: ListingCardModalProps) {
	const [imgLoading, setImgLoading] = useState(true);
	const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
	//const picID = Number(props.data._id.substring(0,2));
	const picID = props.data.rent % 1000;

	const checkoutApartment = async (index: number) => {
		try {
			await axios.delete(`http://localhost:3000/listings/${index}`, { withCredentials: true });
			setIsCheckoutModalOpen(false);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<Modal show={props.showModal} onHide={props.handleClose} size="lg">
				<Modal.Header closeButton>
					<Modal.Title style={{ marginBlock: -8, fontWeight: "bold" }}>
						{props.data.street +
							", " +
							props.data.city +
							" " +
							props.data.state}
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
									<div>${props.data.rent}</div>
									<div>Utilities: </div>
									<div>${props.data.utilities}</div>
									<div>Bedrooms: </div>
									<div>{props.data.bedrooms}</div>
									<div>Bathrooms: </div>
									<div>{props.data.bedrooms}</div>
									<div>Preferred Gender: </div>
									<div>{props.data.prefGender}</div>
									<div>Start Date:</div>
									<div>{props.data.moveInDate}</div>
									<div>End Date:</div>
									<div>{props.data.moveOutDate}</div>
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
										{/* <li>Heating & Cooling: {props.data.heatingCooling.toString()}</li>
										<li>Laundry & Dryer: {props.data.laundryDryer.toString()}</li>
										<li>Internet: {props.data.internet.toString()}</li>
										<li>Car Parking: {props.data.carParking.toString()}</li>
										<li>TV: {props.data.tv.toString()}</li>
										<li>Gym: {props.data.gym.toString()}</li>
										<li>Pool: {props.data.pool.toString()}</li>
										<li>Patio: {props.data.patio.toString()}</li>
										<li>Bathtub: {props.data.bath.toString()}</li> */}
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
									{/* <div>Pets Allowed?:</div>
									<div>{props.data.allowedPets.toString()}</div>
									<div>Smoking Allowed?</div>
									<div>{props.data.allowedSmoking.toString()}</div>
									<div>Guests Allowed?</div>
									<div>{props.data.allowedGuests.toString()}</div>
									<div>Quiet Hours Start:</div>
									<div>{props.data.quietHoursStart}</div>
									<div>Quiet Hours Until:</div>
									<div>{props.data.quietHoursEnd}</div> */}
								</div>
							</Col>
						</Row>
					</div>
				</Modal.Body>
			</Modal>
			<CheckoutModal
				data={props.data}
				showModal={isCheckoutModalOpen}
				handleClose={() => checkoutApartment(props.data.id)}
			/>
		</>
	);
}

export default ListingCardModal;
