import { Row, Modal } from "react-bootstrap";
import { Trash3 } from "react-bootstrap-icons";
import { ListingCardData } from "../../utils/Interfaces";
import ThemeButton from "../base/ThemedButton";

interface DeleteModalProps {
	data: ListingCardData;
	showModal: boolean;
	handleClose: () => any;
}

function DeleteModal(props: DeleteModalProps) {
	return (
		<Modal show={props.showModal} onHide={props.handleClose} size="sm">
			<Modal.Header closeButton></Modal.Header>
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
						{"Are you sure you would like to remove " +
							props.data.street +
							", " +
							props.data.city +
							" " +
							props.data.state +
							"?"}
					</Row>
					<ThemeButton
						icon={<Trash3 size={24} />}
						onClick={() => {
							fetch(
								`http://localhost:3000/listings/${props.data.id}}` +
									props.data.id,
								{
									method: "DELETE",
								}
							);
							window.location.reload();
						}}
					>
						Delete Listing
					</ThemeButton>
				</div>
			</Modal.Body>
		</Modal>
	);
}

export default DeleteModal;
