import React, { useState, useEffect } from 'react';
import { getAllDevices } from '../service/api';
import Card from '../components/Products/Card';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

const ProductsPage = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    estado: '',
    fecha_creacion_after: '',
    fecha_creacion_before: '',
  });

  // Función para obtener dispositivos con filtros
  const fetchDevices = async (currentPage, currentFilters) => {
    try {
      setLoading(true);
      // Limpiar filtros vacíos y convertir estado a booleano
      const cleanFilters = Object.entries(currentFilters).reduce((acc, [key, value]) => {
        if (value !== '') {
          if (key === 'estado') {
            acc[key] = value === 'true';
          } else {
            acc[key] = value;
          }
        }
        return acc;
      }, {});

      const response = await getAllDevices(currentPage, cleanFilters);
      // Manejar la respuesta paginada del backend
      setDevices(response.results || []);
      setTotalPages(Math.ceil((response.count || 0) / 9)); // 9 es el tamaño de página definido en el backend
    } catch (error) {
      console.error("Error al obtener los dispositivos", error);
      setDevices([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar cambios en los filtros
  const handleFilterChange = (filterName) => (event) => {
    const newFilters = {
      ...filters,
      [filterName]: event.target.value,
    };
    setFilters(newFilters);
    setPage(1); // Reset page when filters change
    fetchDevices(1, newFilters);
  };

  // Función para manejar cambios de página
  const handlePageChange = (event, value) => {
    setPage(value);
    fetchDevices(value, filters);
  };

  useEffect(() => {
    fetchDevices(page, filters);
  }, [page, filters]); // Añadimos las dependencias necesarias

  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 min-h-screen">
      <Header />

      <Container maxWidth="lg" className="py-20 px-4">
        {/* Título y botón de crear */}
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

        {/* Filtros */}
        <Box className="bg-white p-4 rounded-lg shadow-md mb-8">
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filters.estado}
                  label="Estado"
                  onChange={handleFilterChange('estado')}
                >
                  <MenuItem value="">Todos</MenuItem>
                  <MenuItem value="true">Activo</MenuItem>
                  <MenuItem value="false">Inactivo</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Fecha desde"
                type="date"
                value={filters.fecha_creacion_after}
                onChange={handleFilterChange('fecha_creacion_after')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Fecha hasta"
                type="date"
                value={filters.fecha_creacion_before}
                onChange={handleFilterChange('fecha_creacion_before')}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Lista de dispositivos */}
        <Grid container spacing={4}>
          {loading ? (
            <Box className="w-full text-center p-4">
              <CircularProgress />
            </Box>
          ) : devices && devices.length > 0 ? (
            devices.map((device) => (
              <Grid item xs={12} sm={6} md={4} key={device.id}>
                <Card device={device} />
              </Grid>
            ))
          ) : (
            <Box className="w-full text-center p-4">
              <Typography className="text-white">No se encontraron dispositivos.</Typography>
            </Box>
          )}
        </Grid>

        {/* Paginación */}
        {!loading && devices && devices.length > 0 && (
          <Box className="flex justify-center mt-8">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
              className="bg-white rounded-lg p-2"
            />
          </Box>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default ProductsPage;
