import { MainContent, MainLayout, Sidebar } from "./components/layout"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom"

function AppContent() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/buttons') {
      setActiveModule('botones');
    } else if (location.pathname === '/document-upload') {
      setActiveModule('document-upload');
    } else if (location.pathname === '/') {
      setActiveModule(null);
    }
  }, [location.pathname]);

  const handleModuleSelect = (moduleId: string) => {
    setActiveModule(moduleId);
    if (moduleId === 'botones') {
      navigate('/buttons');
    } else if (moduleId === 'document-upload') {
      navigate('/document-upload');
    }
  };

  return (
    <MainLayout>
      <Sidebar onModuleSelect={handleModuleSelect} />
      <MainContent activeModule={activeModule} />
    </MainLayout>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/buttons" element={<AppContent />} />
        <Route path="/document-upload" element={<AppContent />} />
      </Routes>
    </Router>
  )
}

export default App
