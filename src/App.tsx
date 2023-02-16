import { Route, Routes } from "react-router-dom";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Register from "@pages/Register";
import PageNotFound from "@pages/404";

export default function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
