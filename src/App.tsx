import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// State
import UserProvider from "./state-management/providers/UserProvider";

// Pages
import BrowsePage from "./pages/BrowsePage";
import SavedPage from "./pages/SavedPage";
import Header from "./components/Header";
import PostedPage from "./pages/PostedPage";
import LoginSignupPage from "./pages/LoginSignupPage";

// Styles
import "./styles/App.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

export const App = () => {
	return (
		<UserProvider>
			<BrowserRouter>
				<Header />
				<div style={{ marginInline: 48 }}>
					<Routes>
						<Route path="/" element={<Navigate to={"/browse"} />} />
						<Route path="/browse" element={<BrowsePage />} />
						<Route path="/saved" element={<SavedPage />} />
						<Route path="/posted" element={<PostedPage />} />
						<Route path="/login" element={<LoginSignupPage mode="login" formTitle="Welcome User!" />} />
						<Route path="/signup" element={<LoginSignupPage mode="signup" formTitle="New Account" />} />
						<Route path="/modLogin" element={<LoginSignupPage mode="login" moderator formTitle="Welcome Moderator!" />} />
					</Routes>
				</div>
			</BrowserRouter>
		</UserProvider>
	);
};

export default App;
