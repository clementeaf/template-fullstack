import React from 'react';
import { type Column } from './types';
import Table from './Table';

interface SampleData {
  id: string;
  name: string;
  email: string;
  status: string;
}

/**
 * Componente principal del módulo de tabla
 */
const TableModule: React.FC = () => {
  const sampleData: SampleData[] = [
    { id: '1', name: 'Ejemplo 1', email: 'ejemplo1@email.com', status: 'Activo' },
    { id: '2', name: 'Ejemplo 2', email: 'ejemplo2@email.com', status: 'Inactivo' },
  ];

  const columns: Column<SampleData>[] = [
    {
      key: 'name',
      header: 'Nombre',
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'status',
      header: 'Estado',
      render: (item) => {
        const isActive = item.status === 'Activo';
        return (
          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {item.status}
          </span>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col w-full h-full items-start justify-start">
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tabla</h1>
        <p className="text-gray-600">Módulo de demostración de componentes de tabla</p>
      </section>

      <section className="mt-10 w-full">
        <Table
          columns={columns}
          data={sampleData}
          keyExtractor={(item) => item.id}
        />
      </section>
    </div>
  );
};

export default TableModule;

