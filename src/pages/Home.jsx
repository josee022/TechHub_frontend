import React from "react";
import { Container, Grid, Button, Typography } from "@mui/material";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import Features from "../components/Home/Features";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 min-h-screen">
      <Header />

      {/* Contenido Principal */}
      <Container maxWidth="lg" className="py-20 px-4">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              className="text-3xl font-extrabold text-white mb-4"
            >
              Bienvenido a TechHub
            </Typography>
            <Typography
              variant="h5"
              className="text-lg text-white opacity-80 mb-6"
            >
              Gestiona tus dispositivos IoT de manera eficiente y en tiempo real
              con nuestra plataforma intuitiva y poderosa.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className="bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
            >
              <Link to="/products" className="text-white">
                {" "}
                Ver dispositivos
              </Link>
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="images/iot-devices.jpg"
              alt="Imagen de dispositivos IoT"
              className="w-full rounded-xl shadow-2xl transform hover:scale-105 transition duration-500"
            />
          </Grid>
        </Grid>
      </Container>

      {/* Características */}
      <Features />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
