import React, { useEffect, useState } from "react";
import { getAnimeByPage } from "../services/api.jsx";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../pages/Home.css";

const Home = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchAnimeSeries = async () => {
      try {
        const data = await getAnimeByPage(2);
        
        if (!isMounted) return;
        
        if (!data || data.length === 0) {
          throw new Error('La API no devolvió resultados');
        }
        
        setSeries(data);
      } catch (error) {
        if (isMounted) {
          setError(error.message || "Error al cargar los animes");
          console.error("Detalles del error:", {
            error: error.message,
            stack: error.stack
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAnimeSeries();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleWatchEpisode = (serie) => {
    const episodeUrl = `https://2anime.xyz/embed/${serie.title.toLowerCase().replace(/[^\w-]+/g, '-')}-episode-${serie.episode}`;
    const encodedEpisodeUrl = encodeURIComponent(episodeUrl);
    
    // Redirige al componente Episode con los parámetros necesarios
    navigate(`/episode/${encodedEpisodeUrl}`, {
      state: {
        title: serie.title,
        episode: serie.episode
      }
    });
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        color: '#fff'
      }}>
        <Typography variant="h5">Cargando animes...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        textAlign: 'center',
        color: '#fff'
      }}>
        <Typography variant="h5" gutterBottom>
          ¡Ups! Algo salió mal
        </Typography>
        <Typography variant="body1" gutterBottom>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => window.location.reload()}
          style={{ marginTop: '20px' }}
        >
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", color: "#fff" }}>
      <Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
        ¡Bienvenido a la mejor página de Anime!
      </Typography>

      <Typography variant="h4" gutterBottom style={{ marginTop: "30px" }}>
        Animes Populares
      </Typography>

      <Grid container spacing={2}>
        {series.map((serie) => (
          <Grid item key={serie.link_url} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="card-hover-effect"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                transition: "transform 0.3s ease"
              }}
            >
              <CardMedia
                component="img"
                height="380"
                image={serie.thumbnail_url}
                alt={serie.title}
                style={{ objectFit: "cover" }}
              />
              <CardContent style={{ flexGrow: 1, padding: "8px", color: "#fff" }}>
                <Typography variant="h6" style={{ fontSize: "0.9rem" }}>
                  {serie.title}
                </Typography>
                <Typography variant="body2">
                  Episodio: {serie.episode}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                fullWidth
                style={{
                  margin: "8px 0",
                  background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                  color: "#000"
                }}
                onClick={() => handleWatchEpisode(serie)}
              >
                Ver Episodio
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;