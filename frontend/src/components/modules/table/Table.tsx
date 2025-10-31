import React from 'react';
import { type TableProps } from './types';

/**
 * Renderiza el contenido de una celda de tabla
 * @param column - Configuración de la columna
 * @param item - Item de datos
 * @returns Contenido renderizado de la celda
 */
function renderCellContent<T>(column: TableProps<T>['columns'][number], item: T): React.ReactNode {
  if (column.render) {
    return column.render(item);
  }
  const value = (item as Record<string, unknown>)[column.key];
  return value !== null && value !== undefined ? String(value) : '';
}

/**
 * Componente de tabla genérico y reutilizable
 * @param columns - Configuración de columnas
 * @param data - Array de datos a mostrar
 * @param keyExtractor - Función para extraer la clave única de cada item
 * @param emptyMessage - Mensaje a mostrar cuando no hay datos
 * @param className - Clases CSS adicionales
 */
function Table<T>({ columns, data, keyExtractor, emptyMessage, className }: TableProps<T>): React.ReactElement {
  if (data.length === 0) {
    return (
      <div className={`text-center text-gray-500 py-8 ${className || ''}`}>
        {emptyMessage || 'No hay datos disponibles'}
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className || ''}`}>
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => {
              const align = column.align || 'left';
              const width = column.width ? { width: column.width } : {};
              return (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : ''
                  }`}
                  style={width}
                >
                  {column.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => {
            const key = keyExtractor(item);
            return (
              <tr key={key}>
                {columns.map((column) => {
                  const align = column.align || 'left';
                  return (
                    <td
                      key={column.key}
                      className={`px-6 py-4 whitespace-nowrap text-sm ${
                        align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {renderCellContent(column, item)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

