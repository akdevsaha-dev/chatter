import { Navigate, Route, Routes } from "react-router-dom";
// import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { ChatsPage } from "./pages/ChatsPage";
import { Loader } from "lucide-react";
export default function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });
  if(isCheckingAuth && !authUser) return <div className="justify-center items-center flex h-screen">
    <Loader className="animate-spin size-10"  />
  </div>
  return (
    <div className="min-h-screen bg-black">
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!authUser? <SignUpPage />: <Navigate to= "/chat"/>} />
        <Route path="/login" element={!authUser?<LoginPage /> : <Navigate to= "/chat"/>} />
        <Route path="/chat" element={ authUser ? <ChatsPage />: <Navigate to="/login"/> } />
        <Route path="/profile" element={authUser? <ProfilePage />: <Navigate to="/login"/>} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}
