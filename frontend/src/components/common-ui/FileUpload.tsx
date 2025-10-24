import React from 'react';

export interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  onFilesSelect?: (files: File[]) => void;
  accept?: string;
  maxSize?: number; // in MB
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  onFilesSelect,
  accept = "*/*",
  maxSize = 10,
  multiple = false,
  disabled = false,
  className = ""
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      
      // Validar tamaño de cada archivo
      const validFiles = fileList.filter(file => {
        if (file.size > maxSize * 1024 * 1024) {
          alert(`El archivo "${file.name}" es demasiado grande. Tamaño máximo: ${maxSize}MB`);
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        if (multiple && onFilesSelect) {
          onFilesSelect(validFiles);
        } else if (!multiple && onFileSelect) {
          onFileSelect(validFiles[0]);
        }
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (disabled) return;
    
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      
      // Validar tamaño de cada archivo
      const validFiles = fileList.filter(file => {
        if (file.size > maxSize * 1024 * 1024) {
          alert(`El archivo "${file.name}" es demasiado grande. Tamaño máximo: ${maxSize}MB`);
          return false;
        }
        return true;
      });

      if (validFiles.length > 0) {
        if (multiple && onFilesSelect) {
          onFilesSelect(validFiles);
        } else if (!multiple && onFileSelect) {
          onFileSelect(validFiles[0]);
        }
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className={`relative ${className}`}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${disabled 
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
          }
        `}
      >
        <div className="text-gray-500 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p className="text-gray-600 mb-4">
          {disabled ? 'Carga deshabilitada' : 'Arrastra y suelta tu archivo aquí'}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Tamaño máximo: {maxSize}MB
        </p>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          disabled={disabled}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className={`
            inline-block px-4 py-2 rounded-md transition-colors
            ${disabled
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
            }
          `}
        >
          {disabled ? 'Carga deshabilitada' : 'Seleccionar archivo'}
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
