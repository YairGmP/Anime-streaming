import axios from 'axios';

// 1. Lista de proxies públicos como fallback
const PROXY_SERVICES = [
  'https://api.allorigins.win/get?url=',
  'https://corsproxy.io/?',
  'https://proxy.cors.sh/'
];

// 2. Tu API base
const API_BASE_URL = 'https://animeapi.skin';

// 3. Función para obtener un proxy aleatorio
const getRandomProxy = () => {
  return PROXY_SERVICES[Math.floor(Math.random() * PROXY_SERVICES.length)];
};

// 4. Configuración de Axios
const api = axios.create({
  timeout: 10000, // 10 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-requested-with': 'XMLHttpRequest'
  }
});

// 5. Interceptor para manejar diferentes entornos
api.interceptors.request.use(async (config) => {
  if (import.meta.env.DEV) {
    // Desarrollo local con proxy de Vite
    config.baseURL = '/api';
  } else {
    // Producción: Usar proxy con reintentos
    const proxyUrl = getRandomProxy();
    config.baseURL = `${proxyUrl}${encodeURIComponent(API_BASE_URL)}`;
  }
  
  console.log('Request config:', config);
  return config;
});

// 6. Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.code === 'ECONNABORTED' || !error.response) {
      console.warn('Proxy fallido, intentando con otro...');
      const newProxy = getRandomProxy();
      error.config.baseURL = `${newProxy}${encodeURIComponent(API_BASE_URL)}`;
      return api.request(error.config);
    }
    return Promise.reject(error);
  }
);

// ========== FUNCIONES DE API ==========
const makeRequest = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    // Para el proxy allorigins que devuelve la respuesta en .contents
    return response.data.contents ? JSON.parse(response.data.contents) : response.data;
  } catch (error) {
    console.error('API Error:', {
      endpoint,
      error: error.message,
      config: error.config
    });
    throw error;
  }
};

export const getTrendingSeries = () => makeRequest('/trending');
export const getAnimeByPage = (page) => makeRequest(`/new?page=${page}`);
export const searchAnimeByKeyword = (keyword) => makeRequest(`/search?q=${encodeURIComponent(keyword)}`);
export const getEpisodesByTitle = (title) => makeRequest(`/episodes?title=${encodeURIComponent(title)}`);