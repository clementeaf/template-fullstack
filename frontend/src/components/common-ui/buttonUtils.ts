/**
 * Utilidades para el componente Button
 * Contiene las clases CSS para variantes y tamaños del botón
 */

/**
 * Clases de variante de color para el botón
 */
export const buttonVariantClasses: Record<string, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
  secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 active:bg-gray-800',
  outline: 'border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500 active:bg-gray-100',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 active:bg-green-800',
  warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500 active:bg-yellow-800',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800'
};

/**
 * Clases de tamaño para el botón
 */
export const buttonSizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

