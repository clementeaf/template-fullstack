import { useLocation } from 'react-router-dom';
import { sidebarItems, type SidebarItem } from '../../utils/sidebarConfig';

interface SidebarProps {
  onModuleSelect: (moduleId: string) => void;
}

export function Sidebar({ onModuleSelect }: SidebarProps) {
  const location = useLocation();

  const handleItemClick = (item: SidebarItem) => {
    onModuleSelect(item.id);
  };

  const isItemActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-white p-4 w-[280px] rounded-2xl flex flex-col gap-4">
      {sidebarItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleItemClick(item)}
          className={`text-lg text-left p-2 rounded-xl transition-colors ${isItemActive(item.path)
              ? 'bg-blue-500/50 text-white'
              : 'hover:bg-blue-500/50 hover:text-white'
            }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}