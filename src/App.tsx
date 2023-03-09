import { lazy, Suspense, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext";

const Landing = lazy(() => import("@pages/Landing"));
const Register = lazy(() => import("@pages/Register"));
const Chat = lazy(() => import("@pages/Chat"));
const PageNotFound = lazy(() => import("@pages/PageNotFound"));

export default function App() {
  const { currentUser }: any = useContext(AuthContext);

  function ProtectedRoute({ children }: any) {
    if (!currentUser) {
      return <Navigate to="/" />;
    }
    return children;
  }

  return (
    <Suspense fallback={<></>}>
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
    </Suspense>
  );
}
