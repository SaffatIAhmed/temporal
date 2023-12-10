import { Card, Col, Row, Stack } from "react-bootstrap";
import { Trash2Fill } from "react-bootstrap-icons";
import IconButton from "../base/IconButton";
import { UserCardData } from "../../utils/Interfaces";
import ConfirmationModal from "../listings/ConfirmationModal";
import { useState } from "react";

interface UserCardProps {
    index: number,
    data: UserCardData,
    onDelete: (index: number) => void
}

function UserCard({ data, onDelete, index }: UserCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onModalClosed = async (confirm: boolean) => {
        setIsModalOpen(false);
        if (confirm) {
            await onDelete(index);
        }
    }

    return (
        <>
            <Card className="mt-1">
                <Card.Body>
                    <Stack direction="horizontal">
                        <Col xs={1}>
                            <IconButton
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Trash2Fill size={24} />
                            </IconButton>
                        </Col>
                        <Col xs={3}>
                            <div className="fw-bold fs-4">{data.firstname} {data.lastname}</div>
                            <div className="text-secondary">@{data.username}</div>
                        </Col>
                        <Col className="align-content-center">
                            <div className="text-secondary">Email: {data.email}</div>
                        </Col>
                    </Stack>
                </Card.Body>
            </Card>
            <ConfirmationModal<{}>
                confirmTextNo="No"
                confirmTextYes="Yes"
                title={"Are you sure you want to delete user @" + data.username}
                handleClose={onModalClosed}
                show={isModalOpen}
                data={{}}
            >
                <div>
                    You really want to delete the user?
                </div>
                <div>
                    NOTE: THIS ACTION IS IRREVERSIBLE
                </div>
            </ConfirmationModal>
        </>
    );
}

export default UserCard;
