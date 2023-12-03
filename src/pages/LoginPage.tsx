import { Card, Container } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import { NavLink } from "react-router-dom";

interface LoginPageProps {
    formTitle: string;
    moderator?: boolean;
}

function LoginPage({ formTitle: formWelcomeMsg, moderator }: LoginPageProps) {
    return (
        <Container fluid>
            <Card style={{ width: "24rem" }} className="mx-auto p-4">
                <Card.Title className="text-center">{formWelcomeMsg}</Card.Title>
                <Card.Body>
                    <LoginForm />
                    {moderator
                        ? null
                        : (
                            <div className="text-center mt-2">
                                Don't have an account? <NavLink to={"/signup"}>Sign Up</NavLink>
                            </div>
                        )
                    }
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginPage;