import React, { useEffect, useState } from "react";
import { getTrendingSeries } from "../services/api";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
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

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return (
      <div>
        Error: {error.message || "Ocurrió un error al cargar los datos."}
      </div>
    );
  }

  if (!loading && !error && series.length === 0) {
    return <div>No se encontraron series.</div>;
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundImage: "url('https://path/to/your/background-image.jpg')", // Aquí puedes agregar tu imagen de fondo
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      <Typography variant="h3" gutterBottom style={{ textAlign: "center" }}>
        ¡Bienvenido a la mejor página de Anime!
      </Typography>
      <Typography variant="h5" gutterBottom style={{ textAlign: "center" }}>
        Descubre los animes más populares y recomendados del momento.
      </Typography>

      <Typography variant="h4" gutterBottom style={{ marginTop: "30px" }}>
        Animes Populares
      </Typography>

      <Grid container spacing={2}>
        {series.map((serie) => (
          <Grid item key={serie.link_url} xs={12} sm={4} md={2.4}>
            <Card
              className="card-hover-effect"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                background:
                  "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <CardMedia
                component="img"
                height="380"
                image={serie.thumbnail_url}
                alt={serie.title}
                style={{ objectFit: "cover", width: "100%" }}
              />
              <CardContent
                style={{
                  flexGrow: 1,
                  padding: "8px",
                  marginBottom: "16px",
                  color: "#fff",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ fontSize: "0.9rem" }}
                >
                  {serie.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="inherit"
                  style={{ fontSize: "0.8rem" }}
                >
                  Episodio: {serie.episode}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                fullWidth
                style={{
                  marginTop: "8px",
                  marginBottom: "8px",
                  fontSize: "0.8rem",
                  background:
                    "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                  color: "#000",
                  textTransform: "none",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() =>
                  navigate(`/episode/${encodeURIComponent(serie.embed_url)}`, {
                    state: { title: serie.title, episode: serie.episode },
                  })
                }
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
