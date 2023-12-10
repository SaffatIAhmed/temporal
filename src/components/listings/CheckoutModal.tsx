import { Row, Col, Modal, Placeholder, FloatingLabel, Form } from "react-bootstrap";
import { CartFill, Star } from "react-bootstrap-icons";
import { ListingCardData } from "../../utils/Interfaces";
import ThemeButton from "../base/ThemedButton";
import { useState } from "react";

interface CheckoutModalProps {
	data: ListingCardData;
	showModal: boolean;
	handleClose: () => any;
}

function CheckoutModal(props: CheckoutModalProps) {

	return (
		<Modal show={props.showModal} onHide={props.handleClose} size="lg">
			<Modal.Header closeButton>
				<Modal.Title style={{ marginBlock: -8, fontWeight: "bold" }}>
					{props.data.street +
						", " +
						props.data.city +
						" " +
						props.data.state 
						}
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
					<Row style={{ width: "100%" }}>
						<Col>
						<div>
							Confirm following listing details
						</div>
						</Col>
						<Col>
						<b>Total Summary: </b>
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
							</div>
						</Col>
					</Row>
					<ThemeButton
								icon={<CartFill size={24} />}
								onClick={() => {
									fetch('http://localhost:3000/listings/' + props.data._id, { method: 'DELETE' });
									window.location.reload();
								}}							
                    >
                    Confirm Payment
                    </ThemeButton>
				</div>
			</Modal.Body>
		</Modal>
		
	);
}

export default CheckoutModal;
