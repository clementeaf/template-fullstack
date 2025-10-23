import { useBackendTest } from '../hooks/useBackend';

const BackendTest = () => {
  const { data, isLoading, error, refetch } = useBackendTest();

  const testBackend = () => {
    refetch();
  };

  return (
    <div style={{ 
      padding: '20px', 
      border: '1px solid #ccc', 
      borderRadius: '8px',
      margin: '20px 0'
    }}>
      <h3>🧪 Prueba de Conexión con Backend</h3>
      <button 
        onClick={testBackend} 
        disabled={isLoading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer'
        }}
      >
        {isLoading ? 'Probando...' : 'Probar Backend'}
      </button>
      
      {data && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px', 
          backgroundColor: '#d4edda',
          borderRadius: '4px',
          border: '1px solid #c3e6cb'
        }}>
          <strong>✅ Respuesta del backend:</strong> {data.message}
          <br />
          <small>Timestamp: {data.timestamp}</small>
        </div>
      )}
      
      {error && (
        <div style={{ 
          marginTop: '10px', 
          padding: '10px', 
          backgroundColor: '#f8d7da',
          borderRadius: '4px',
          border: '1px solid #f5c6cb',
          color: '#721c24'
        }}>
          <strong>❌ Error:</strong> No se pudo conectar con el backend
        </div>
      )}
    </div>
  );
};

export default BackendTest;
