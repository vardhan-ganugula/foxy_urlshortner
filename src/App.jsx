import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CreateUrl from "./pages/dashboard/CreateUrl";
import AddDomain from "./pages/dashboard/AddDomain";
function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-url" element={<CreateUrl />} />
          <Route path="/add-domain" element={<AddDomain />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />
        </Routes>

    </>
  );
}

export default App;
