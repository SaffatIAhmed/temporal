import { Row, Col, Modal } from "react-bootstrap";
import { CartFill } from "react-bootstrap-icons";
import { ListingCardData, ListingContext } from "../../utils/Interfaces";
import ThemeButton from "../base/ThemedButton";

interface CheckoutModalProps {
	context: React.Context<ListingContext>;
	data: ListingCardData;
	showModal: boolean;
	handleClose: () => any;
}

function CheckoutModal(props: CheckoutModalProps) {

	return (
		<Modal show={props.showModal} onHide={props.handleClose} size="xl">
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
						onClick={props.handleClose}
					>
						Confirm Payment
					</ThemeButton>
				</div>
			</Modal.Body>
		</Modal>

	);
}

export default CheckoutModal;
