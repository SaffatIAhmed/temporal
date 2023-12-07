import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import UserCard from "../components/users/UserCard";
import { UserCardData } from "../utils/Interfaces";
import { useNavigate } from "react-router";
import { UserContext } from "../state-management/contexts/UserContext";
import { RouteNames } from "../utils/RoutesInfo";

function UsersPage() {
    const { isLoggedIn, role } = useContext(UserContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserCardData[]>([]);

    useEffect(() => {
        if (!isLoggedIn || (isLoggedIn && role !== "moderator")) {
            navigate(RouteNames.HOME);
        } else {
            fetch("http://localhost:3000/users")
                .then(result => result.json())
                .then(data => setUsers(data));
        }
    }, [isLoggedIn]);

    const handleDeleteUser = async (index: number) => {
        console.log({ deleteUser: users[index] });
    }

    return (
        <Container
            fluid
            style={{
                maxWidth: 1144,
                marginTop: 48,
                marginBottom: 96,
                padding: 0,
            }}
        >
            <div className="d-flex flex-column" >
                {users.map((user, index) => {
                    return <UserCard key={index}
                        firstName={user.firstName}
                        lastName={user.lastName}
                        index={index}
                        onDelete={handleDeleteUser}
                    />;
                })}
            </div>
        </Container>
    )
}

export default UsersPage;
