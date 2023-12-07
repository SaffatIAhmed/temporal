import { Card, Container } from "react-bootstrap";
import LoginForm from "../components/users/LoginForm";
import RegisterForm from "../components/users/RegisterForm";
import { useNavigate } from "react-router";
import { UserContext } from "../state-management/contexts/UserContext";
import { useContext, useEffect } from "react";
import { RouteNames } from "../utils/RoutesInfo";

interface LoginSignupPageProps {
    mode: 'login' | 'register';
    formTitle?: string;
}

function LoginRegisterPage({ mode, formTitle }: LoginSignupPageProps) {
    const navigate = useNavigate();
    const userState = useContext(UserContext);

    useEffect(() => {
        if (userState.isLoggedIn) {
            navigate(RouteNames.HOME);
        }
    }, [userState.isLoggedIn]);

    return (
        <Container fluid
            style={{
                maxWidth: 1144,
                marginTop: 48,
                marginBottom: 96,
                padding: 0,
            }}
        >
            <Card style={{ maxWidth: "24rem" }} className="mx-auto p-2">
                <Card.Body>
                    <Card.Title>{formTitle}</Card.Title>
                    <hr />
                    {
                        mode === 'login'
                            ? <LoginForm />
                            : <RegisterForm />
                    }
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginRegisterPage;