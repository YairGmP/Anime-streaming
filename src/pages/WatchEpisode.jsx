import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Container, Box, Alert } from '@mui/material';

const WatchEpisode = () => {
  const { animeTitle, episodeId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [anime, setAnime] = useState({});
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    // Obtener los detalles del anime según el título y episodio (puedes hacer una llamada API o usar datos locales)
    setAnime({ title: decodeURIComponent(animeTitle) });
    setEpisode(episodeId);
  }, [animeTitle, episodeId]);

  const iframeUrl = `https://2anime.xyz/embed/${animeTitle}-episode-${episodeId}`;

  const handleIframeError = () => {
    setError('No se pudo cargar el episodio. Por favor, intenta nuevamente o verifica la URL.');
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Box textAlign="center">
        <Typography variant="h4" gutterBottom>
          {anime.title} - Episodio {episode}
        </Typography>
        {error ? (
          <Alert severity="error" style={{ marginBottom: '20px' }}>
            {error}
          </Alert>
        ) : (
          <iframe
            src={iframeUrl}
            width="100%"
            height="500px"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
            style={{ borderRadius: '10px', marginBottom: '20px' }}
            onError={handleIframeError}
            title="Reproductor de Episodio"
          ></iframe>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(-1)} // Regresa a la página anterior
        >
          Volver a la lista de episodios
        </Button>
      </Box>
    </Container>
  );
};

export default WatchEpisode;
