import { useEffect } from "react";
import { useShotStore } from "./store/useShotStore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VerificationPage from "./components/VerificationPage";
import {  Loader } from "lucide-react";
import { useAuthStore } from "./store/useAuthStore";
import UserDashboard from "./components/UserDashboard";
import Employee from "./components/Employee";
import Inspect from "./components/Inspect";

function App() {
  const { getMe, isVerifying, authUser } = useAuthStore();

  useEffect(() => {
    getMe(); // यूजर डेटा लोड करें

  }, [getMe]);

  if (isVerifying) {
    return (
      <div className="flex items-center justify-center bg-indigo-primary min-h-screen">
        <Loader size={50} className="animate-spin text-text-light mx-auto my-auto" />
      </div>
    );
  }

  return (
    <div className="bg-background-page">
      <Navbar />
        <Routes>
          <Route path="/" element={authUser?.isVerified ? <HomePage /> : <Login />} />
          <Route path="/login" element={authUser?.isVerified ? <HomePage /> : <Login />} />
          <Route path="/sign-up" element={authUser?.isVerified ? <HomePage /> : <SignUp />} />
          <Route path="/verify" element={authUser?.isVerified ? <HomePage /> : <VerificationPage />} />
          <Route path="/dashboard" element={authUser?.isVerified ? <UserDashboard /> : <Login />} />
          <Route path="/employee" element={authUser?.isVerified ? <Employee /> : <Login />} />
          <Route path="/inspect" element={authUser?.isVerified ? <Inspect /> : <Login />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
