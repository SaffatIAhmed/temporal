import { useContext, useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import UserCard from "../components/users/UserCard";
import { UserCardData } from "../utils/Interfaces";
import { useNavigate } from "react-router";
import { UserContext } from "../state-management/contexts/UserContext";
import { RouteNames } from "../utils/RoutesInfo";
import axios from "axios";

function UsersPage() {
    const { id, role } = useContext(UserContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState<UserCardData[]>([]);

    useEffect(() => {
        if (!id || (id && role !== "moderator")) {
            return navigate(RouteNames.HOME);
        }

        refreshData();
    }, [id]);

    const refreshData = () => {
        axios.get("http://localhost:3000/users", { withCredentials: true })
            .then(({ data }) => {
                if (data) {
                    setUsers(data as UserCardData[])
                } else {
                    setUsers([]);
                }
            })
            .catch(err => {
                console.log(err);
            });

    }
    const handleDeleteUser = async (index: number) => {
        try {
            const userId = users[index].id;
            await axios.delete(`http://localhost:3000/users/${users[index].id}`, { withCredentials: true })
            setUsers(users.filter(value => value.id !== userId));
        } catch (err) {
            console.log(err);
        }
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
            <div className="d-flex flex-row justify-content-between align-items-center" >
                <div>
                    Currently {users.length} registered users
                </div>
                <div>
                    <Button onClick={refreshData}>
                        Refresh
                    </Button>
                </div>
            </div>
            <div className="d-flex flex-column" >
                {users.map((user, index) => {
                    return <UserCard key={index}
                        index={index}
                        data={user}
                        onDelete={handleDeleteUser}
                    />;
                })}
            </div>
        </Container>
    )
}

export default UsersPage;
