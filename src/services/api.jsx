import axios from 'axios';

// Configuración del proxy público
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const API_BASE_URL = 'https://animeapi.skin';

const api = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : `${PROXY_URL}${API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-requested-with': 'XMLHttpRequest',
    'X-Requested-With': 'XMLHttpRequest' // Algunos proxies necesitan este header adicional
  }
});

// Opcional: Configuración para desarrollo local sin proxy
if (import.meta.env.DEV) {
  api.interceptors.request.use(config => {
    console.log('Requesting:', config.url);
    return config;
  });
}

// ========== FUNCIONES ORIGINALES (MODIFICADAS PARA USAR PROXY) ==========
export const getTrendingSeries = async () => {
  try {
    const response = await api.get('/trending');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending series:', {
      error: error.message,
      response: error.response?.data,
      config: error.config
    });
    throw error;
  }
};

export const getAnimeByPage = async (page) => {
  try {
    const response = await api.get(`/new?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching anime by page:', {
      error: error.message,
      response: error.response?.data,
      config: error.config
    });
    throw error;
  }
};

export const searchAnimeByKeyword = async (keyword) => {
  try {
    const response = await api.get(`/search?q=${encodeURIComponent(keyword)}`);
    return response.data;
  } catch (error) {
    console.error('Error searching anime by keyword:', {
      error: error.message,
      response: error.response?.data,
      config: error.config
    });
    throw error;
  }
};

export const getEpisodesByTitle = async (title) => {
  try {
    const response = await api.get(`/episodes?title=${encodeURIComponent(title)}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching episodes by title:', {
      error: error.message,
      response: error.response?.data,
      config: error.config
    });
    throw error;
  }
};