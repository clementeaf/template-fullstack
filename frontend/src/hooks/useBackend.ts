import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface BackendResponse {
  message: string;
  timestamp: string;
  path: string;
}

export const useBackendTest = () => {
  return useQuery<BackendResponse>({
    queryKey: ['backend-test'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/hello');
      return response.data;
    },
    enabled: false, // Solo se ejecuta manualmente
    retry: false,
  });
};
