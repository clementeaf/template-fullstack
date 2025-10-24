import { BotonesModule } from '../modules/botones';

interface MainContentProps {
  activeModule: string | null;
}

export function MainContent({ activeModule }: MainContentProps) {
  const renderModuleContent = () => {
    switch (activeModule) {
      case 'botones':
        return <BotonesModule />;
      default:
        return <div className="text-center text-gray-500">Selecciona un módulo</div>;
    }
  };

  return (
    <div className="bg-white p-4 w-full rounded-2xl flex justify-center items-center">
      {renderModuleContent()}
    </div>
  )
}