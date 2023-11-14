import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/App.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import BrowsePage from "./pages/BrowsePage";
import SavedPage from "./pages/SavedPage";

export const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to={"/browse"} />} />
				<Route path="/browse" element={<BrowsePage />} />
				<Route path="/saved" element={<SavedPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
