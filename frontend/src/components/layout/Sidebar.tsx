import { useLocation } from 'react-router-dom';
import { sidebarItems, type SidebarItem } from '../../utils/sidebarConfig';

interface SidebarProps {
  onModuleSelect: (moduleId: string) => void;
}

/**
 * Componente Sidebar que muestra la navegación lateral de la aplicación
 * @param onModuleSelect - Función callback que se ejecuta cuando se selecciona un módulo
 */
export function Sidebar({ onModuleSelect }: SidebarProps) {
  const location = useLocation();

  /**
   * Maneja el clic en un item del sidebar
   * @param item - Item del sidebar que fue clickeado
   */
  const handleItemClick = (item: SidebarItem): void => {
    onModuleSelect(item.id);
  };

  /**
   * Determina si un item del sidebar está activo según la ruta actual
   * @param path - Ruta del item a verificar
   * @returns true si el item está activo
   */
  const isItemActive = (path: string): boolean => {
    return location.pathname === path;
  };

  /**
   * Obtiene las clases CSS para un item del sidebar según su estado
   * @param path - Ruta del item
   * @returns String con las clases CSS aplicables
   */
  const getItemClasses = (path: string): string => {
    const baseClasses = 'text-lg text-left p-2 rounded-xl transition-colors';
    const activeClasses = 'bg-blue-500/50 text-white';
    const inactiveClasses = 'hover:bg-blue-500/50 hover:text-white';
    
    return isItemActive(path)
      ? `${baseClasses} ${activeClasses}`
      : `${baseClasses} ${inactiveClasses}`;
  };

  return (
    <div className="bg-white p-4 w-[280px] rounded-2xl flex flex-col gap-4">
      {sidebarItems.map((item: SidebarItem) => (
        <button
          key={item.id}
          onClick={() => handleItemClick(item)}
          className={getItemClasses(item.path)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}