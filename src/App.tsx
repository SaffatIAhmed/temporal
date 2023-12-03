
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to={"/login"} />} />
				<Route path="/login" element={<LoginPage formTitle="Welcome User!" />} />
				<Route path="/signup" element={<RegisterPage />} />
				<Route path="/modLogin" element={<LoginPage formTitle="Welcome Moderator!" moderator />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
