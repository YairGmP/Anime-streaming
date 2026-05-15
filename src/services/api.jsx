import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : 'https://api.jikan.moe/v4',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

const mapAnime = (item) => ({
  title: item.title_english || item.title,
  thumbnail_url: item.images?.jpg?.large_image_url || item.images?.jpg?.image_url,
  episode: item.episodes || 1,
  link_url: item.url,
  mal_id: item.mal_id,
});

export const getTrendingSeries = async () => {
  const response = await api.get('/top/anime?filter=airing&limit=24');
  return response.data.data.map(mapAnime);
};

export const getAnimeByPage = async (page) => {
  const response = await api.get(`/seasons/now?page=${page}`);
  return response.data.data.map(mapAnime);
};

export const searchAnimeByKeyword = async (keyword) => {
  const response = await api.get(`/anime?q=${encodeURIComponent(keyword)}&limit=24`);
  return response.data.data.map(mapAnime);
};

export const getEpisodesByTitle = async (title) => {
  const searchResponse = await api.get(`/anime?q=${encodeURIComponent(title)}&limit=1`);
  const animeList = searchResponse.data.data;
  if (!animeList.length) return [];

  const anime = animeList[0];
  const episodeCount = anime.episodes || 12;
  const slug = (anime.title_english || anime.title)
    .toLowerCase()
    .replace(/[^\w-]+/g, '-');

  return Array.from({ length: episodeCount }, (_, i) => ({
    embed_url: `https://2anime.xyz/embed/${slug}-episode-${i + 1}`,
  }));
};
