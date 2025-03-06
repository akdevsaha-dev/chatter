import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import { SignUpPage } from "./pages/SignUpPage";
import { LoginPage } from "./pages/LoginPage";
import { ChatsPage } from "./pages/ChatsPage";

export default function App() {
  const { authUser, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  return (
    <div className="min-h-screen bg-stone-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile"
          element={
            <ProfilePage />
          }
        />
        <Route
          path="/settings"
          element={
            <SettingsPage />
          }
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/users"
          element={
            <ChatsPage />
          }
        />
      </Routes>
    </div>

  );
}
