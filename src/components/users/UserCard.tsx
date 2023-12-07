import { Row, Col, Card } from "react-bootstrap";
import { Trash2Fill } from "react-bootstrap-icons";
import IconButton from "../base/IconButton";

interface UserCardProps {
    index: number,
    firstName: string,
    lastName: string,
    onDelete: (index: number) => void
}

function UserCard({ firstName, lastName, onDelete, index }: UserCardProps) {
    return (
        <>
            <Card >
                <Card.Body>
                    <div className="d-flex justify-start align-items-center">
                        <IconButton
                            icon={<Trash2Fill size={24} />}
                            onClick={async () => await onDelete(index)}
                        />
                        <div className="mx-4 fw-bold">{firstName.toUpperCase()} {lastName.toUpperCase()}</div>
                    </div>
                </Card.Body>
            </Card>
        </>
    );
}

export default UserCard;
