import React from "react";
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: "40px", marginBottom:"100px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Acerca de Nosotros
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="textSecondary"
        paragraph
      >
        Somos una plataforma dedicada a brindar información y entretenimiento a
        los amantes del anime. Nuestra misión es conectar a los fans con sus
        series favoritas y ofrecer una experiencia única.
      </Typography>

      <Grid container spacing={4} justifyContent="center" style={{ marginTop: "20px" }}>
        {/* Card 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              background:
                "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
              color: "#fff",
              borderRadius: "12px",
            }}
          >
            <CardMedia
              component="img"
              height="250"
              image="https://culturedvultures.com/wp-content/uploads/2022/11/image_2022-11-01_112512251.jpg" // Cambiar imagen
              alt="Misión"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Nuestra Misión
              </Typography>
              <Typography variant="body2">
                Ofrecer contenido actualizado y una experiencia fluida para
                todos los fans del anime.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              background:
                "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
              color: "#fff",
              borderRadius: "12px",
            }}
          >
            <CardMedia
              component="img"
              height="250"
              image="https://th.bing.com/th/id/R.2cc1cb92eb90672c51c74670e64a8e7a?rik=fu9dJb%2fQcfoP%2fA&pid=ImgRaw&r=0" // Cambiar imagen
              alt="Visión"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Nuestra Visión
              </Typography>
              <Typography variant="body2">
                Ser la principal fuente de referencia para todos los otakus del
                mundo.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card 3 */}
        <Grid item xs={12} sm={6} md={4}>
          <Card
            style={{
              background:
                "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
              color: "#fff",
              borderRadius: "12px",
            }}
          >
            <CardMedia
              component="img"
              height="250"
              image="https://api.duniagames.co.id/api/content/upload/file/9925444641672824130.jpg" // Cambiar imagen
              alt="Valores"
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Nuestros Valores
              </Typography>
              <Typography variant="body2">
                Respeto, pasión y compromiso con nuestra comunidad.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
