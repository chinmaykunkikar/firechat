import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "@pages/Chat";
import Login from "@pages/Login";
import Register from "@pages/Register";
import PageNotFound from "@pages/404";
import { AuthContext } from "@contexts/AuthContext";

export default function App() {
  const { currentUser }: any = useContext(AuthContext);

  function ProtectedRoute({ children }: any) {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  }

  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
