import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import WorkflowListPage from "./pages/WorkflowListPage";
import { EditorPage } from "./pages/EditorPage";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/workflows" element={<WorkflowListPage />} />
      <Route path="/editor" element={<EditorPage />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

function App() {
  return <AppRoutes />;
}

export default App;
