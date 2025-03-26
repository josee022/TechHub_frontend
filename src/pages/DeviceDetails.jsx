import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDeviceDetails } from "../service/api";
import { Container, Paper, Typography, Grid, Chip, Box, Button } from "@mui/material";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageIcon from '@mui/icons-material/Image';

const DeviceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [imageError, setImageError] = useState(false);
  const API_URL = 'http://localhost:8000';

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const data = await getDeviceDetails(id);
        console.log("Device Details:", data);
        setDevice(data);
        setImageError(false);
        
        // Verificar si el usuario es propietario o admin
        const userData = JSON.parse(localStorage.getItem('user'));
        console.log("User Data:", userData);
        console.log("Device User:", data.user);
        
        // Verificar si el usuario está autenticado y es propietario o admin
        if (userData && data.user) {
          const isAdmin = userData.role === 'admin';
          const isOwner = parseInt(userData.id) === parseInt(data.user.id);
          console.log("User ID:", userData.id, "Device User ID:", data.user.id);
          console.log("Is Admin:", isAdmin);
          console.log("Is Owner:", isOwner);
          setIsOwner(isAdmin || isOwner);
        }
      } catch (error) {
        console.error("Error al obtener los detalles del dispositivo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeviceDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 min-h-screen">
        <Header />
        <Container className="py-20">
          <Typography variant="h5" className="text-white text-center">
            Cargando detalles del dispositivo...
          </Typography>
        </Container>
        <Footer />
      </div>
    );
  }

  if (!device) {
    return (
      <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 min-h-screen">
        <Header />
        <Container className="py-20">
          <Typography variant="h5" className="text-white text-center">
            Dispositivo no encontrado
          </Typography>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 min-h-screen">
      <Header />
      <Container maxWidth="lg" className="py-20">
        <Paper className="p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
          {/* Botones de navegación */}
          <Box className="flex justify-between items-center mb-6">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/products")}
              variant="outlined"
            >
              Volver
            </Button>
            {isOwner && (
              <Button
                startIcon={<EditIcon />}
                onClick={() => navigate(`/edit-device/${id}`)}
                variant="contained"
                color="primary"
              >
                Editar Dispositivo
              </Button>
            )}
          </Box>

          <Grid container spacing={4}>
            {/* Imagen del dispositivo */}
            <Grid item xs={12} md={6}>
              <div className="w-full h-96 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {device.imagen && !imageError ? (
                  <img
                    src={device.imagen.startsWith('http') ? device.imagen : `${API_URL}${device.imagen}`}
                    alt={device.nombre}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <ImageIcon sx={{ fontSize: 64, marginBottom: 2 }} />
                    <Typography variant="h6" color="textSecondary">
                      Sin imagen
                    </Typography>
                  </div>
                )}
              </div>
            </Grid>

            {/* Detalles del dispositivo */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" className="font-bold mb-4">
                {device.nombre}
              </Typography>

              <Box className="flex gap-2 mb-4">
                <Chip
                  label={device.estado ? "Activo" : "Inactivo"}
                  color={device.estado ? "success" : "error"}
                />
                <Chip label={device.tipo} color="primary" />
              </Box>

              <Typography variant="body1" className="mb-4">
                {device.descripcion || "Sin descripción"}
              </Typography>

              <Box className="space-y-2 mb-4">
                <Typography variant="body2">
                  <strong>Ubicación:</strong> {device.ubicacion || "No especificada"}
                </Typography>
                <Typography variant="body2">
                  <strong>Modelo de Firmware:</strong> {device.modelo_firmware || "No especificado"}
                </Typography>
                <Typography variant="body2">
                  <strong>Propietario:</strong> {device.user?.username || "No especificado"}
                </Typography>
                <Typography variant="body2">
                  <strong>Fecha de Creación:</strong>{" "}
                  {format(new Date(device.fecha_creacion), "PPp", { locale: es })}
                </Typography>
                <Typography variant="body2">
                  <strong>Última Actualización:</strong>{" "}
                  {format(new Date(device.last_updated), "PPp", { locale: es })}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default DeviceDetails;
