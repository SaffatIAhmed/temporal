import LinkBtn from "../components/LinkBtn";
import LoginForm from "../components/LoginForm";
import "../styles/LoginPages.scss";

interface Props {
    formWelcomeMsg: string;
}

function LoginPage({ formWelcomeMsg }: Props) {
    return(
        <>
            <div className="page">
                <LoginForm welcomeMsg = {formWelcomeMsg}/>
                <div className="link-btn">
                    <LinkBtn btnContext="Don't have an account?" btnText="Sign Up" btnLink="/signup" />
                </div>
            </div>
        </>
    );
}

export default LoginPage;