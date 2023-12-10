import { Row, Col, Modal, Carousel, Image, Placeholder } from "react-bootstrap";
import { CartFill, Star } from "react-bootstrap-icons";
import { ListingCardData } from "../../utils/Interfaces";
import CheckoutModal from "./CheckoutModal";
import ThemeButton from "../base/ThemedButton";
import { useState } from "react";

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

	function convertBoolean(input: boolean){
		return (input ? "Yes" : "No");
	}

	function convertDate(input: string){
		const curDate = new Date(input);
		
		return curDate.getMonth() + "/" + curDate.getDate() + "/" + curDate.getFullYear();
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
									<div>{convertDate(props.data.startDate)}</div>
									<div>End Date:</div>
									<div>{convertDate(props.data.endDate)}</div>
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
										<li>Heating & Cooling: {convertBoolean(props.data.heatingCooling)}</li>
										<li>Laundry & Dryer: {convertBoolean(props.data.laundryDryer)}</li>
										<li>Internet: {convertBoolean(props.data.internet)}</li>
										<li>Car Parking: {convertBoolean(props.data.carParking)}</li>
										<li>TV: {convertBoolean(props.data.tv)}</li>
										<li>Gym: {convertBoolean(props.data.gym)}</li>
										<li>Pool: {convertBoolean(props.data.pool)}</li>
										<li>Patio: {convertBoolean(props.data.patio)}</li>
										<li>Bathtub: {convertBoolean(props.data.bath)}</li>
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
									<div>Pets Allowed?:</div>
									<div>{convertBoolean(props.data.allowedPets)}</div>
									<div>Smoking Allowed?</div>
									<div>{convertBoolean(props.data.allowedSmoking)}</div>
									<div>Guests Allowed?</div>
									<div>{convertBoolean(props.data.allowedGuests)}</div>
									<div>Quiet Hours Start:</div>
									<div>{props.data.quietHoursStart}</div>
									<div>Quiet Hours Until:</div>
									<div>{props.data.quietHoursEnd}</div>
								</div>
							</Col>
						</Row>
					</div>
				</Modal.Body>
			</Modal>
			<CheckoutModal
				data={props.data}
				showModal={isCheckoutModalOpen}
				handleClose={() => setIsCheckoutModalOpen(false)}
			/>
		</>
	);
}

export default ListingCardModal;
