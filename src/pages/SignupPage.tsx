import LinkBtn from "../components/LinkBtn";
import SignupForm from '../components/SignupForm';
import "../styles/LoginPages.scss";

function SignupPage() {
    return (
        <>
            <div className="page">
                <SignupForm />
                <div className="link-btn">
                    <LinkBtn btnContext="Already have an account?" btnText="Login" btnLink="/login" />
                </div>
            </div>
        </>
    );
}

export default SignupPage;