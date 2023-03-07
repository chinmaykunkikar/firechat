import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Chat from "@pages/Chat";
import Landing from "@pages/Landing";
import Register from "@pages/Register";
import PageNotFound from "@pages/PageNotFound";
import { AuthContext } from "@contexts/AuthContext";

export default function App() {
  const { currentUser }: any = useContext(AuthContext);

  function ProtectedRoute({ children }: any) {
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  }

  return (
    <Routes>
      <Route
        index
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
