import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Series from "../pages/Series";
import Episode from "../pages/Episode";
import AnimeDetails from "../pages/AnimeDetails"; // Importa el componente AnimeDetails
import WatchEpisode from "../pages/WatchEpisode";
import About from "../pages/About"; // Importar About
import Contact from "../pages/Contact"; //  Importar Contact

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta principal (Home) */}
      <Route path="/" element={<Home />} />

      {/* Ruta para buscar anime (Series) */}
      <Route path="/series" element={<Series />} />

      {/*  Ruta para ver detalles del anime (lista de episodios) */}
      <Route path="/series/:title" element={<AnimeDetails />} />

      {/* Ruta dinámica para ver un episodio */}
      <Route path="/episode/:episodeId" element={<Episode />} />

      {/* Ruta para ver y reproducir un episodio */}
      <Route
        path="/watch/:animeTitle/:episodeId"
        element={<WatchEpisode />}
      />

      {/*  Nueva Ruta para About */}
      <Route path="/about" element={<About />} />

      {/*  Nueva Ruta para Contact */}
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;
