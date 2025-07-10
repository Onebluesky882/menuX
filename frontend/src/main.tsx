import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import { Toaster } from "sonner";
import FeedbackForm from "./pages/FeedbackForm.tsx";

import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import { MenuRoute, ShopRoute } from "./route/Shop.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NotFound from "./pages/NotFound.tsx";
import Payment from "./pages/payment/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="payment" element={<Payment />} />
          <Route path="feedback" element={<FeedbackForm />} />
          {ShopRoute}
          {MenuRoute}

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
