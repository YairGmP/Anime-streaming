import axios from 'axios';

// Configura Axios para usar el proxy y evitar problemas de CORS
const api = axios.create({
  baseURL: '/api', // Usa el prefijo /api
});

// Obtener series populares (trending)
export const getTrendingSeries = async () => {
  try {
    const response = await api.get('/trending'); // Solicitud a /api/trending
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching trending series:', error);
    throw error;
  }
};

// Obtener animes por página
export const getAnimeByPage = async (page) => {
  try {
    const response = await api.get(`/new?page=${page}`); // Solicitud a /api/new?page={page}
    return response.data;
  } catch (error) {
    console.error('Error fetching anime by page:', error);
    throw error;
  }
};

// Buscar anime por palabra clave
export const searchAnimeByKeyword = async (keyword) => {
  try {
    const response = await api.get(`/search?q=${keyword}`); // Solicitud a /api/search?q={keyword}
    return response.data;
  } catch (error) {
    console.error('Error searching anime by keyword:', error);
    throw error;
  }
};

// Obtener lista de episodios por título
export const getEpisodesByTitle = async (title) => {
  try {
    const response = await api.get(`/episodes?title=${title}`); // Solicitud a /api/episodes?title={title}
    return response.data;
  } catch (error) {
    console.error('Error fetching episodes by title:', error);
    throw error;
  }
};