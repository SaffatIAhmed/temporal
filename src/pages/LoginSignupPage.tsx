import { Card, Container } from "react-bootstrap";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/RegisterForm";

interface LoginSignupPageProps {
    mode: 'login' | 'signup';
    moderator?: boolean;
    formTitle?: string;
}

function LoginSignupPage({ mode, moderator, formTitle }: LoginSignupPageProps) {

    return (
        <Container fluid
            style={{
                maxWidth: 1144,
                marginTop: 48,
                marginBottom: 96,
                padding: 0,
            }}
        >
            <Card style={{ maxWidth: "24rem" }} className="mx-auto p-4">
                <Card.Title className="text-center">{formTitle}</Card.Title>
                <Card.Body>
                    {
                        mode === 'login'
                            ? <LoginForm moderator={moderator} />
                            : <SignupForm />
                    }
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginSignupPage;