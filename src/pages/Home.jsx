import React, { useEffect, useState } from "react";
import { getTrendingSeries, getEmbedUrl } from "../services/api.jsx";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../pages/Home.css";

const Home = () => {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingSeries = async () => {
      try {
        const data = await getTrendingSeries();
        setSeries(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingSeries();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!series.length) return <div>No se encontraron series.</div>;

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
            <Card className="card-hover-effect" style={cardStyle}>
              <CardMedia
                component="img"
                height="380"
                image={serie.thumbnail_url}
                alt={serie.title}
                style={{ objectFit: "cover" }}
              />
              <CardContent style={cardContentStyle}>
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
                style={buttonStyle}
                onClick={() => {
                  const embedUrl = getEmbedUrl(serie.title, serie.episode);
                  navigate(`/episode`, { 
                    state: { 
                      embedUrl,
                      title: serie.title,
                      episode: serie.episode 
                    }
                  });
                }}
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

// Estilos (puedes moverlos a Home.css)
const cardStyle = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
  transition: "transform 0.3s ease"
};

const cardContentStyle = {
  flexGrow: 1,
  padding: "8px",
  color: "#fff"
};

const buttonStyle = {
  margin: "8px 0",
  background: "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
  color: "#000"
};

export default Home;