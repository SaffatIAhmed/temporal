import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//Constants
import { RouteNames } from "./utils/RoutesInfo";

// State
import UserProvider from "./state-management/providers/UserProvider";

// Pages
import BrowsePage from "./pages/BrowsePage";
import SavedPage from "./pages/SavedPage";
import Header from "./components/common/Header";
import PostedPage from "./pages/PostedPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import UsersPage from "./pages/UsersPage";

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
						<Route path={RouteNames.HOME} element={<Navigate to={"/browse"} />} />
						<Route path={RouteNames.BROWSE} element={<BrowsePage />} />
						<Route path={RouteNames.SAVED} element={<SavedPage />} />
						<Route path={RouteNames.POSTED} element={<PostedPage />} />
						<Route path={RouteNames.LOGIN} element={<LoginRegisterPage mode="login" formTitle="Log In" />} />
						<Route path={RouteNames.REGISTER} element={<LoginRegisterPage mode="register" formTitle="Register" />} />
						<Route path={RouteNames.USERS} element={<UsersPage />} />
					</Routes>
				</div>
			</BrowserRouter>
		</UserProvider>
	);
};

export default App;
