import React, { useEffect, useState } from "react";
import { getAllDevices } from "../service/api"; // Importamos la función para obtener todos los dispositivos
import Header from "../components/Home/Header"; // Componente Header
import Footer from "../components/Home/Footer"; // Componente Footer
import Card from "../components/Products/Card"; // Componente para mostrar cada producto
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const ProductsPage = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener dispositivos cuando la página cargue
    const fetchDevices = async () => {
      try {
        const data = await getAllDevices();
        setDevices(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los dispositivos", error);
        setLoading(false);
      }
    };
    fetchDevices();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 min-h-screen">
      <Header />

      {/* Título y botón de crear */}
      <Container maxWidth="lg" className="py-20 px-4">
        <Box className="flex justify-between items-center mb-8">
          <div>
            <Typography variant="h3" className="text-4xl font-extrabold text-white mb-4">
              Nuestros Dispositivos IoT
            </Typography>
            <Typography variant="h6" className="text-white opacity-80">
              Explora todos nuestros dispositivos conectados y descubre cómo nuestra plataforma puede hacer más eficiente tu gestión IoT.
            </Typography>
          </div>
          <Link to="/create-device">
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Crear Dispositivo
            </Button>
          </Link>
        </Box>

        {loading ? (
          <div className="text-center text-white">Cargando dispositivos...</div>
        ) : (
          <Grid container spacing={4}>
            {devices.map((device) => (
              <Grid item xs={12} sm={6} md={4} key={device.id}>
                <Card device={device} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default ProductsPage;
