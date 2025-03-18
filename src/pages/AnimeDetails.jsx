import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getEpisodesByTitle } from "../services/api";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

const AnimeDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { anime } = location.state; // Obtener el anime del estado
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const data = await getEpisodesByTitle(anime.title);
        setEpisodes(data);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };

    fetchEpisodes();
  }, [anime.title]);

  return (
    <Container maxWidth="lg" style={{ marginTop: "20px", marginBottom:"20px" }}>
      <Card
        style={{
          background:
            "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box display="flex" flexDirection="row" alignItems="flex-start">
          {/* Imagen a la izquierda */}
          <CardMedia
            component="img"
            height="1000"
            image={
              anime.thumbnail_url || "https://via.placeholder.com/300x450"
            }
            alt={anime.title}
            style={{
              width: "70%",
              objectFit: "cover",
              borderRadius: "8px 0 0 8px",
            }}
          />

          {/* Contenido a la derecha */}
          <CardContent
            style={{
              width: "60%",
              padding: "20px",
              color: "#000", // Texto negro para mejor contraste
            }}
          >
            <Typography variant="h4" gutterBottom>
              {anime.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Total de episodios: {episodes.length}
            </Typography>

            {/* Lista de episodios */}
            <List>
              {episodes.map((episode, index) => (
                <ListItem key={index} style={{ padding: "8px 0" }}>
                  <ListItemText
                    primary={`Episodio ${index + 1}`}
                    style={{ color: "#000" }}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                      navigate(
                        `/episode/${encodeURIComponent(episode.embed_url)}`,
                        {
                          state: { anime, episode: index + 1 },
                        }
                      )
                    }
                    style={{
                      background: "#ffffff", // Nuevo color para el botón
                      color: "#000", // Texto negro para contraste
                      textTransform: "none",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        background: "#00b8e6", // Color más oscuro al pasar el mouse
                      },
                    }}
                  >
                    Ver Episodio
                  </Button>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Box>
      </Card>
    </Container>
  );
};

export default AnimeDetails;
