import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

interface FetchProtectedDataResponse {
  data: any; 
}

export const fetchProtectedData = async (token: string): Promise<FetchProtectedDataResponse> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error fetching protected data');
  }
};
