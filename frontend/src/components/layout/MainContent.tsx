import { BotonesModule } from '../modules/botones';
import { DocumentUploadModule } from '../modules/document-upload';
import { TableModule } from '../modules/table';
import { type ReactElement } from 'react';

interface MainContentProps {
  activeModule: string | null;
}

/**
 * Mapeo de IDs de módulos a sus componentes correspondientes
 */
const moduleComponents: Record<string, () => ReactElement> = {
  'botones': () => <BotonesModule />,
  'document-upload': () => <DocumentUploadModule />,
  'table': () => <TableModule />,
};

/**
 * Renderiza el contenido del módulo activo usando un objeto de mapeo
 * @param activeModule - ID del módulo activo
 * @returns Componente del módulo o mensaje por defecto
 */
const renderModuleContent = (activeModule: string | null): ReactElement => {
  if (!activeModule) {
    return <div className="text-center text-gray-500">Selecciona un módulo</div>;
  }

  const ModuleComponent = moduleComponents[activeModule];
  if (!ModuleComponent) {
    return <div className="text-center text-gray-500">Módulo no encontrado</div>;
  }

  return ModuleComponent();
};

export function MainContent({ activeModule }: MainContentProps) {
  return (
    <div className="bg-white p-4 w-full rounded-2xl flex items-start justify-start">
      {renderModuleContent(activeModule)}
    </div>
  );
}