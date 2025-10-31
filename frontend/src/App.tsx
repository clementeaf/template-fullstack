import { MainContent, MainLayout, Sidebar } from "./components/layout"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { get } from "radashi"

/**
 * Mapeo de rutas a IDs de módulos
 */
const routeToModuleMap: Record<string, string | null> = {
  '/': null,
  '/buttons': 'botones',
  '/document-upload': 'document-upload'
};

/**
 * Mapeo de IDs de módulos a rutas
 */
const moduleToRouteMap: Record<string, string> = {
  'botones': '/buttons',
  'document-upload': '/document-upload'
};

/**
 * Componente principal de la aplicación que maneja el routing y la navegación
 */
function AppContent() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Actualiza el módulo activo según la ruta actual
   */
  useEffect(() => {
    const moduleId = get(routeToModuleMap, location.pathname, null) as string | null;
    setActiveModule(moduleId);
  }, [location.pathname]);

  /**
   * Maneja la selección de un módulo y navega a su ruta correspondiente
   * @param moduleId - ID del módulo seleccionado
   */
  const handleModuleSelect = (moduleId: string): void => {
    setActiveModule(moduleId);
    const route = get(moduleToRouteMap, moduleId) as string | undefined;
    if (route) {
      navigate(route);
    }
  };

  return (
    <MainLayout>
      <Sidebar onModuleSelect={handleModuleSelect} />
      <MainContent activeModule={activeModule} />
    </MainLayout>
  )
}

/**
 * Componente raíz de la aplicación que configura el routing
 */
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
