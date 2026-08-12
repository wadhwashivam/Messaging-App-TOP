import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Profile from './pages/Profile';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
    <Routes>
      <Route path='/' element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path= "/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>}/>
      <Route path="/chat/:userId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
    </Routes>
  );
}

export default App
