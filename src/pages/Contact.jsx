import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Gracias por contactarnos, ${formData.nombre}!`);
    // Aquí puedes agregar lógica para enviar los datos del formulario
    setFormData({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "40px",  marginBottom:"100px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contáctanos
      </Typography>
      <Typography
        variant="body1"
        align="center"
        color="textSecondary"
        paragraph
      >
        ¿Tienes alguna duda o sugerencia? ¡Escríbenos y nos pondremos en
        contacto contigo lo antes posible!
      </Typography>

      <Box component="form" onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              name="correo"
              type="email"
              value={formData.correo}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mensaje"
              name="mensaje"
              multiline
              rows={4}
              value={formData.mensaje}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={{
                background:
                  "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
                color: "#fff",
                padding: "10px 20px",
              }}
            >
              Enviar Mensaje
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Contact;
