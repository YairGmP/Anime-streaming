import React from 'react';
import { Box, Typography, Container, Divider } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { GitHub } from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'rgba(0, 0, 36, 0.9)',
        color: '#e0e1e3',
        py: 3, // Menor espacio vertical
        px: { xs: 2, sm: 4 }, // Menos padding lateral en pantallas pequeñas
        borderTop: '1px solid rgba(224, 225, 227, 0.2)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Sección "Acerca de" */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Sobre AnimeZoneGG
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
              Tu plataforma para explorar animes populares, buscar series y descubrir
              nuevos episodios. ¡No te pierdas el contenido más reciente!
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
              <Typography variant="body2" sx={{ color: 'rgba(224, 225, 227, 0.7)' }}>
                Síguenos en GitHub:
              </Typography>
              <Link
                to="https://github.com/YairGMP"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'white' }}
              >
                <GitHub style={{ color: 'white', fontSize: '1.3rem' }} />
              </Link>
            </Box>
          </Grid>

          {/* Sección "Enlaces Útiles" */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Enlaces Útiles
            </Typography>

            {[
              { name: 'Inicio', path: '/' },
              { name: 'Buscar Anime', path: '/series' },
              { name: 'Acerca de Nosotros', path: '/about' },
              { name: 'Contáctanos', path: '/contact' },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.path}
                style={{
                  display: 'block',
                  marginBottom: '0.6rem',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                }}
              >
                {link.name}
              </Link>
            ))}
          </Grid>

          {/* Sección "Contacto" */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 1.5 }}>
              Contacto
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
              Email: info@animezone.gg
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5, lineHeight: 1.5 }}>
              Ubicación: México
            </Typography>
          </Grid>
        </Grid>

        {/* Divider para separar el contenido */}
        <Divider sx={{ borderColor: 'rgba(224, 225, 227, 0.2)', my: 3 }} />

        {/* Derechos reservados */}
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
            © {currentYear} AnimeZoneGG. Todos los derechos reservados.
          </Typography>
          <Typography
            variant="caption"
            display="block"
            sx={{ mt: 0.5, color: 'rgba(224, 225, 227, 0.7)' }}
          >
            Desarrollado con ❤️ por YairGMF.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
