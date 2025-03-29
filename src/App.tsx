import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import WorkflowListPage from "./pages/WorkflowListPage";
import { EditorPage } from "./pages/EditorPage";

import { Toaster } from "@/components/ui/sonner";
import { useEffect } from "react";
import { initializeWorkflows } from "./services/storage";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/workflows" element={<WorkflowListPage />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/editor/:id" element={<EditorPage />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
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
