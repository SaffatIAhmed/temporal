import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import BrowsePage from "./pages/BrowsePage";
import SavedPage from "./pages/SavedPage";
import Header from "./components/Header";
import PostedPage from "./pages/PostedPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<div style={{ marginInline: 48 }}>
				<Routes>
					<Route path="/" element={<Navigate to={"/browse"} />} />
					<Route path="/browse" element={<BrowsePage />} />
					<Route path="/saved" element={<SavedPage />} />
					<Route path="/posted" element={<PostedPage />} />
					<Route path="/login" element={<LoginPage formTitle="Welcome User!" />} />
					<Route path="/signup" element={<RegisterPage />} />
					<Route path="/modLogin" element={<LoginPage formTitle="Welcome Moderator!" moderator />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
