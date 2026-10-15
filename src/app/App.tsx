import { TrainerPage } from "@/pages/trainer";
import { MainLayout } from "@/shared/ui/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<TrainerPage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
