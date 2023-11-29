
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
export const App = ()=> {
  return (
    <BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to={"/login"} />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
        <Route path="/modLogin" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
  );
};

export default App;
