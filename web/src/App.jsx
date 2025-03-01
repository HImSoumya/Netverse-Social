import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";

function App() {
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user")) || null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    user = null;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/auth/register" element={user ? <Navigate to="/" /> : <Register />} />
          <Route path="/profile/:username" element={user ? <Profile /> : <Navigate to="/auth/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
