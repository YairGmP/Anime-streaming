import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Button, Box } from '@mui/material';

const Episode = () => {
  const { episodeId } = useParams(); // Obtén el parámetro dinámico de la URL
  const location = useLocation(); // Accede al estado de la navegación
  const { title, episode } = location.state || {}; // Obtén las props del estado
  const decodedEpisodeId = decodeURIComponent(episodeId); // Decodifica la URL
  const navigate = useNavigate(); // Hook para la navegación

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Reproduciendo: {title}</h1>
      <p>Episodio: {episode}</p>
      <iframe
        src={decodedEpisodeId}
        width="80%"
        height="500px"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        title="Reproductor de anime"
      ></iframe>

      {/* Contenedor para alinear el botón al fondo */}
      <Box mt={3} textAlign="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(-1)} // Regresa a la página anterior
          style={{ marginTop: '20px' }}
        >
          Volver a la lista de episodios
        </Button>
      </Box>
    </div>
  );
};

export default Episode;
