import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import WorkflowListPage from "./pages/WorkflowListPage";
import { EditorPage } from "./pages/EditorPage";

import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { initializeWorkflows } from "./services/storage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-indicator" />
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

const AppRoutes = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/workflows" element={<WorkflowListPage />} />
          <Route path="/editor" element={<EditorPage />} />
          <Route path="/editor/:id" element={<EditorPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

function App() {
  useEffect(() => {
    initializeWorkflows();
  }, []);
  return (
    <>
      <Toaster />
      <AppRoutes />
    </>
  );
}

export default App;
