import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import UserProfile from "./pages/profile/UserProfile";
import UpdateProfile from "./pages/profile/UpdateProfile"; // Import the Update Profile page
import ForgetPassword from "./ForgetPassword"; // Import the Forget Password page

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className='p-4 h-screen flex items-center justify-center'>
			<Routes>
				<Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
				<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
				<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
				<Route path="/profile" element={<UserProfile />} />
				<Route path="/update-profile" element={<UpdateProfile />} /> {/* Update Profile route */}
				<Route path="/forget-password" element={<ForgetPassword />} /> {/* Forget Password route */}
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;