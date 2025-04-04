import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? 'https://proxy.cors.sh/https://animeapi.skin' // Proxy para desarrollo
    : 'https://animeapi.skin', // URL directa en producción
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(import.meta.env.DEV && {
      'x-cors-api-key': 'temp_38a9b7b1b3e5b5b5b5b5b5b5b5b5b5b5' // Key temporal para cors.sh
    }),
    ...(!import.meta.env.DEV && {
      'Origin': 'https://tu-dominio.vercel.app'
    })
  }
});

/* 
 * === FUNCIONES ORIGINALES PRESERVADAS AL 100% ===
 * (Copiar y pegar aquí TODAS tus funciones exactamente como las tienes)
 */
export const getTrendingSeries = async () => {
  try {
    const response = await api.get('/trending');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending series:', error);
    throw error;
  }
};

export const getAnimeByPage = async (page) => {
  try {
    const response = await api.get(`/new?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching anime by page:', error);
    throw error;
  }
};

export const searchAnimeByKeyword = async (keyword) => {
  try {
    const response = await api.get(`/search?q=${encodeURIComponent(keyword)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching anime by keyword:', error);
    throw error;
  }
};

export const getEpisodesByTitle = async (title) => {
  try {
    const response = await api.get(`/episodes?title=${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching episodes by title:', error);
    throw error;
  }
};

export default api;