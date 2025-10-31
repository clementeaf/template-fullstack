import React, { useState } from 'react';
import { FileUpload } from '../../common-ui';
import { select } from 'radashi';

interface UploadedFile {
  id: string;
  file: File;
  status: 'uploading' | 'completed' | 'error';
  progress?: number;
}

const DocumentUploadModule: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [maxSize, setMaxSize] = useState<number>(10);

  /**
   * Maneja la selección de archivos y crea los objetos UploadedFile correspondientes
   * @param files - Array de archivos seleccionados
   */
  const handleFilesSelect = (files: File[]): void => {
    const timestamp = Date.now();
    const newFiles: UploadedFile[] = files.map((file: File) => ({
      id: `${timestamp}-${Math.random()}-${file.name}`,
      file,
      status: 'uploading' as const,
      progress: 0
    }));

    newFiles.forEach((newFile: UploadedFile) => {
      setUploadedFiles(prev => [...prev, newFile]);
      
      const interval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map((f: UploadedFile) => 
            f.id === newFile.id 
              ? { ...f, progress: Math.min((f.progress || 0) + 10, 100) }
              : f
          )
        );
      }, 200);

      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map((f: UploadedFile) => 
            f.id === newFile.id 
              ? { ...f, status: 'completed' as const, progress: 100 }
              : f
          )
        );
        clearInterval(interval);
      }, 2000);
    });
  };

  /**
   * Elimina un archivo de la lista de archivos cargados
   * @param fileId - ID del archivo a eliminar
   */
  const removeFile = (fileId: string): void => {
    setUploadedFiles(prev => 
      select(
        prev,
        file => file,
        file => file.id !== fileId
      )
    );
  };

  /**
   * Formatea el tamaño de un archivo en bytes a una representación legible
   * @param bytes - Tamaño del archivo en bytes
   * @returns String con el tamaño formateado (ej: "1.5 MB")
   */
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Carga de Documento</h1>
      <p className="text-gray-600">Módulo para cargar y gestionar documentos</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Área de carga */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Cargar Documentos</h2>
          <FileUpload
            onFilesSelect={handleFilesSelect}
            maxSize={maxSize}
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            multiple={true}
            className="mb-4"
          />
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tamaño máximo (MB)
            </label>
            <input 
              type="number" 
              value={maxSize}
              onChange={(e) => setMaxSize(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="1"
              max="100"
            />
          </div>
        </div>

        {/* Lista de archivos */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Archivos Cargados ({uploadedFiles.length})
          </h2>
          {uploadedFiles.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2">No hay archivos cargados</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {uploadedFiles.map((uploadedFile) => (
                <div key={uploadedFile.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {uploadedFile.file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(uploadedFile.file.size)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {uploadedFile.status === 'uploading' && (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-xs text-blue-600">{uploadedFile.progress}%</span>
                        </div>
                      )}
                      {uploadedFile.status === 'completed' && (
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs text-green-600">Completado</span>
                        </div>
                      )}
                      <button
                        onClick={() => removeFile(uploadedFile.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {uploadedFile.status === 'uploading' && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadedFile.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadModule;
