import { TrainerPage } from "@/pages/trainer";
import { MainLayout } from "@/shared/ui/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { ProfilePage } from "@/pages/profile";
export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<TrainerPage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
