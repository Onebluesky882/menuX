import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import { Toaster } from "sonner";
import UserProfile from "./pages/UserProfile.tsx";
import FeedbackForm from "./pages/FeedbackForm.tsx";
import Feature from "./feature/idea.tsx";

import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import { MenuRoute, ShopRoute } from "./route/Shop.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NotFound from "./pages/NotFound.tsx";
import TodoList from "./feature/todo.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="feedback" element={<FeedbackForm />} />
          <Route path="feature" element={<Feature />} />
          {ShopRoute}
          {MenuRoute}

          {/* <ShopRoute /> */}
          {/* Uncaught Error: [Shop] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment> */}
          <Route path="*" element={<NotFound />} />
          <Route path="todo" element={<TodoList />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
