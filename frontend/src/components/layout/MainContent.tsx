import { BotonesModule } from '../modules/botones';
import { DocumentUploadModule } from '../modules/document-upload';

interface MainContentProps {
  activeModule: string | null;
}

export function MainContent({ activeModule }: MainContentProps) {
  const renderModuleContent = () => {
    switch (activeModule) {
      case 'botones':
        return <BotonesModule />;
      case 'document-upload':
        return <DocumentUploadModule />;
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