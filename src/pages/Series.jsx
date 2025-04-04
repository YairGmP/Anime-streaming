import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAnimeByPage,
  searchAnimeByKeyword,
} from "../services/api.jsx";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Pagination,
  Stack,
} from "@mui/material";
import "../pages/Home.css";

const Series = () => {
  const [animeList, setAnimeList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(2); // Cambiado a 2 como página inicial
  const [totalPages] = useState(200);

  // Agrupar animes por título y sumar episodios
  const groupAnimeByTitle = (animes) => {
    const grouped = {};

    animes.forEach((anime) => {
      const key = anime.title;
      if (!grouped[key]) {
        grouped[key] = {
          title: anime.title,
          thumbnail_url: anime.thumbnail_url,
          totalEpisodes: 1,
        };
      } else {
        grouped[key].totalEpisodes += 1;
      }
    });

    return Object.values(grouped);
  };

  // Cargar animes por página o búsqueda
  useEffect(() => {
    const fetchAnime = async () => {
      setIsLoading(true);
      try {
        const data = await getAnimeByPage(currentPage);
        const groupedAnime = groupAnimeByTitle(data);
        setAnimeList(groupedAnime);
      } catch (error) {
        console.error("Error fetching anime:", error);
        // Si hay error, intenta con página 2
        if (currentPage !== 2) {
          setCurrentPage(2);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!isSearching) {
      fetchAnime();
    }
  }, [currentPage, isSearching]);

  // Buscar anime por palabra clave
  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      setIsSearching(false);
      setCurrentPage(2); // Cambiado a 2 como página por defecto
      return;
    }

    setIsLoading(true);
    setIsSearching(true);
    try {
      const data = await searchAnimeByKeyword(searchKeyword);
      const groupedAnime = groupAnimeByTitle(data);
      setAnimeList(groupedAnime);
    } catch (error) {
      console.error("Error searching anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cambiar de página
  const handlePageChange = (event, page) => {
    // Si intentan ir a la página 1, redirigir a la 2
    const targetPage = page === 1 ? 2 : page;
    setCurrentPage(targetPage);
    setIsSearching(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" color="white" gutterBottom style={{ marginTop: "30px" }}>
        Buscar Anime
      </Typography>

      {/* Buscador */}
      <Box sx={{ display: "flex", gap: 2, marginBottom: "20px" }}>
        <TextField
          fullWidth
          label="Escribe el anime"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={isLoading}
          sx={{ minWidth: "120px" }}
        >
          {isLoading ? "Buscando..." : "Buscar"}
        </Button>
      </Box>

      {/* Mensaje si no hay resultados */}
      {isSearching && animeList.length === 0 && !isLoading && (
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ marginBottom: "20px" }}
        >
          No se encontraron resultados para "{searchKeyword}".
        </Typography>
      )}

      {/* Lista de animes agrupados */}
      <Grid container spacing={2}>
        {animeList.map((anime) => (
          <Grid item key={anime.title} xs={12} sm={6} md={4} lg={2.4}>
            <Card
              className="card-hover-effect"
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                background:
                  "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <CardMedia
                component="img"
                sx={{ height: 380, objectFit: "cover" }}
                image={anime.thumbnail_url}
                alt={anime.title}
              />
              <CardContent
                sx={{
                  flexGrow: 1,
                  padding: "8px",
                  color: "#fff",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{
                    fontSize: "1rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {anime.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="inherit"
                  style={{ fontSize: "0.8rem", marginBottom: "8px" }}
                >
                  Para ver el total de episodios y visualizarlos da click en ver
                  más detalles.
                </Typography>
                <Button
                  component={Link}
                  to={`/series/${encodeURIComponent(anime.title)}`}
                  state={{ anime }}
                  variant="contained"
                  fullWidth
                  style={{
                    marginTop: "8px",
                    fontSize: "0.8rem",
                    minHeight: "40px",
                    minWidth: "100%",
                    background:
                      "radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                    color: "#000",
                    textTransform: "none",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Paginación */}
      {!isSearching && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
        >
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              showFirstButton
              showLastButton
              boundaryCount={2}
              siblingCount={2}
            />
          </Stack>
        </Box>
      )}
    </div>
  );
};

export default Series;