import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : 'https://animeapi.skin',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-requested-with': 'XMLHttpRequest'  // Obligatorio para la API
  }
});

// ========== TUS FUNCIONES ORIGINALES (EXACTAMENTE IGUAL) ==========
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