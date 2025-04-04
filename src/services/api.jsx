import axios from 'axios';

// Configuración de Axios (ajuste mínimo)
const api = axios.create({
  baseURL: window.location.hostname === 'localhost' ? '/api' : 'https://animeapi.skin', // Proxy solo en local
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// === ¡TODAS TUS FUNCIONES SE MANTIENEN EXACTAMENTE IGUAL! ===

// 1. Series populares (trending)
export const getTrendingSeries = async () => {
  try {
    const response = await api.get('/trending');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending series:', error);
    throw error;
  }
};

// 2. Animes por página
export const getAnimeByPage = async (page) => {
  try {
    const response = await api.get(`/new?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching anime by page:', error);
    throw error;
  }
};

// 3. Buscar por keyword
export const searchAnimeByKeyword = async (keyword) => {
  try {
    const response = await api.get(`/search?q=${encodeURIComponent(keyword)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching anime by keyword:', error);
    throw error;
  }
};

// 4. Episodios por título
export const getEpisodesByTitle = async (title) => {
  try {
    const response = await api.get(`/episodes?title=${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching episodes by title:', error);
    throw error;
  }
};

// Exporta todo como está
export default api;