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
import ChatContainer from "./pages/chatBox/ChatContainer ";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

export default function App() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <Router>
        <Routes>
          {/* If the user is authenticated, redirect to Home */}
          <Route
            path="/auth/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/auth/register"
            element={user ? <Navigate to="/" replace /> : <Register />}
          />

          {/* Protected Route: If the user is not logged in, redirect to login */}
          <Route
            path="/profile/:username"
            element={user ? <Profile /> : <Navigate to="/auth/login" replace />}
          />

          {/* Default Route: If the user is logged in, show Home, else go to Login */}
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/auth/login" replace />}
          />
          <Route
            path="/chats"
            element={
              user ? <ChatContainer /> : <Navigate to="/auth/login" replace />
            }
          />
        </Routes>
      </Router>
    </>
  );
}
