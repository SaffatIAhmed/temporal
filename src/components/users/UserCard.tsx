import { Card, Col, Row, Stack } from "react-bootstrap";
import { Trash2Fill } from "react-bootstrap-icons";
import IconButton from "../base/IconButton";
import { UserCardData } from "../../utils/Interfaces";

interface UserCardProps {
    index: number,
    data: UserCardData,
    onDelete: (index: number) => void
}

function UserCard({ data, onDelete, index }: UserCardProps) {
    return (
        <>
            <Card className="mt-1">
                <Card.Body>
                    <Stack direction="horizontal">
                        <Col xs={1}>
                            <IconButton
                                onClick={async () => await onDelete(index)}
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
        </>
    );
}

export default UserCard;
