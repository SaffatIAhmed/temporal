import LoginForm from "../components/LoginForm";

interface Props {
    formWelcomeMsg: string;
}

function LoginPage({ formWelcomeMsg }: Props) {
    return(
        <LoginForm welcomeMsg = {formWelcomeMsg}/>
    );
}

export default LoginPage;