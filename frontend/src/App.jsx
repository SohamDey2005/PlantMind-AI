import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Chat from "./pages/Chat";
import KnowledgeGraph from "./pages/KnowledgeGraph";
import Compliance from "./pages/Compliance";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>

          <Route path="/" element={<Dashboard />} />

          <Route path="/documents" element={<Documents />} />

          <Route path="/chat" element={<Chat />} />

          <Route path="/knowledge" element={<KnowledgeGraph />} />

          <Route path="/compliance" element={<Compliance />} />

        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;