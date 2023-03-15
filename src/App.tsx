import { ROUTE_CHAT, ROUTE_HOME, ROUTE_REGISTER } from "@/utils/constants";
import { AuthContext } from "@contexts/AuthContext";
import { lazy, Suspense, useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const Landing = lazy(() => import("@pages/Landing"));
const Register = lazy(() => import("@pages/Register"));
const Chat = lazy(() => import("@pages/Chat"));
const PageNotFound = lazy(() => import("@pages/PageNotFound"));

export default function App() {
  const { currentUser }: any = useContext(AuthContext);

  function ProtectedRoute({ children }: any) {
    if (!currentUser) {
      return <Navigate to={ROUTE_HOME} />;
    }
    return children;
  }

  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route
          index
          path={ROUTE_CHAT}
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route path={ROUTE_HOME} element={<Landing />} />
        <Route path={ROUTE_REGISTER} element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}
