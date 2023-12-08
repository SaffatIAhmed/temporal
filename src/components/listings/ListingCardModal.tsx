import { Row, Col, Modal, Carousel, Image, Placeholder } from "react-bootstrap";
import { CartFill, Star } from "react-bootstrap-icons";
import { ListingCardData } from "../../utils/Interfaces";
import ThemeButton from "../base/ThemedButton";
import { useState } from "react";

interface ListingCardModalProps {
	data: ListingCardData;
	showModal: boolean;
	handleClose: () => any;
}

function ListingCardModal(props: ListingCardModalProps) {
	const [imgLoading, setImgLoading] = useState(true);

	return (
		<Modal show={props.showModal} onHide={props.handleClose} size="lg">
			<Modal.Header closeButton>
				<Modal.Title style={{ marginBlock: -8, fontWeight: "bold" }}>
					{props.data.address.neighborhood +
						", " +
						props.data.address.city +
						" " +
						props.data.address.state}
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
								src={`https://picsum.photos/id/${props.data.id}/640/360`}
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
								src={`https://picsum.photos/id/${props.data.id + 1
									}/640/360`}
								rounded
							/>
						</Carousel.Item>
						<Carousel.Item>
							<Image
								src={`https://picsum.photos/id/${props.data.id + 2
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
							onClick={function (): {} {
								throw new Error("Function not implemented.");
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
								<div>Shared: </div>
								<div>TBD</div>
								<div>Preferred:</div>
								<div>TBD</div>
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
									<li>TBD</li>
									<li>TBD</li>
									<li>TBD</li>
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
								<div>Min. Stay</div>
								<div>TBD</div>
								<div>Pet Friendly:</div>
								<div>TBD</div>
								<div>Smoking:</div>
								<div>TBD</div>
								<div>Guests:</div>
								<div>TBD</div>
								<div>Quiet Hours:</div>
								<div>TBD</div>
							</div>
						</Col>
					</Row>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default ListingCardModal;
