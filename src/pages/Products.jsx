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
  Paper,
  InputAdornment,
  Chip,
  Fade,
  Zoom,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import DevicesIcon from '@mui/icons-material/Devices';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import { motion } from "framer-motion";

// Animaciones para elementos que entran en la pantalla
const fadeInUp = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ProductsPage = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [filters, setFilters] = useState({
    estado: '',
    fecha_creacion_after: '',
    fecha_creacion_before: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Función para obtener dispositivos con filtros
  const fetchDevices = async (currentPage, currentFilters, search = '', order = 'newest') => {
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

      // Añadir búsqueda y orden si existen
      if (search) {
        cleanFilters.search = search;
      }

      if (order) {
        cleanFilters.ordering = order === 'newest' ? '-fecha_creacion' : 'fecha_creacion';
      }

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
    fetchDevices(1, newFilters, searchTerm, sortOrder);
  };

  // Función para manejar cambios de página
  const handlePageChange = (event, value) => {
    setPage(value);
    fetchDevices(value, filters, searchTerm, sortOrder);
  };

  // Función para manejar la búsqueda
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      setPage(1);
      fetchDevices(1, filters, searchTerm, sortOrder);
    }
  };

  // Función para manejar el ordenamiento
  const handleSortChange = (event) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    setPage(1);
    fetchDevices(1, filters, searchTerm, newSortOrder);
  };

  // Función para limpiar todos los filtros
  const clearFilters = () => {
    setFilters({
      estado: '',
      fecha_creacion_after: '',
      fecha_creacion_before: '',
    });
    setSearchTerm('');
    setSortOrder('newest');
    setPage(1);
    fetchDevices(1, {}, '', 'newest');
  };

  // Función para alternar la visibilidad de los filtros
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    fetchDevices(page, filters, searchTerm, sortOrder);
  }, []); // Solo se ejecuta al montar el componente

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      <Header />

      <Container maxWidth="lg" className="py-20 px-4">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Título y botón de crear */}
          <motion.div variants={fadeInUp}>
            <Box className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="mb-6 md:mb-0">
                <Typography 
                  variant="h3" 
                  className="text-4xl font-extrabold mb-4"
                  sx={{
                    color: 'white',
                    textShadow: '0 2px 10px rgba(0,0,0,0.2)'
                  }}
                >
                  Dispositivos IoT
                </Typography>
                <Typography 
                  variant="h6" 
                  className="max-w-2xl"
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  Explora todos nuestros dispositivos conectados y descubre cómo nuestra plataforma puede hacer más eficiente tu gestión IoT.
                </Typography>
              </div>
              <Zoom in={true} style={{ transitionDelay: '200ms' }}>
                <Link to="/create-device">
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    size="large"
                    sx={{
                      borderRadius: '12px',
                      padding: '10px 24px',
                      fontWeight: 'bold',
                      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                      boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                        boxShadow: '0 6px 20px 0 rgba(59, 130, 246, 0.6)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Crear Dispositivo
                  </Button>
                </Link>
              </Zoom>
            </Box>
          </motion.div>

          {/* Barra de búsqueda y filtros */}
          <motion.div variants={fadeInUp}>
            <Paper 
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="Buscar dispositivos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleSearch}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="primary" />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: '12px',
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Ordenar por</InputLabel>
                    <Select
                      value={sortOrder}
                      label="Ordenar por"
                      onChange={handleSortChange}
                      sx={{ borderRadius: '12px' }}
                    >
                      <MenuItem value="newest">Más recientes</MenuItem>
                      <MenuItem value="oldest">Más antiguos</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FilterListIcon />}
                    onClick={toggleFilters}
                    sx={{
                      borderRadius: '12px',
                      height: '56px',
                      borderColor: showFilters ? 'primary.main' : 'grey.300',
                      color: showFilters ? 'primary.main' : 'grey.700',
                      '&:hover': {
                        borderColor: 'primary.main',
                        background: 'rgba(59, 130, 246, 0.04)'
                      }
                    }}
                  >
                    Filtros {showFilters ? 'activos' : ''}
                  </Button>
                </Grid>
              </Grid>

              {/* Filtros expandibles */}
              {showFilters && (
                <Fade in={showFilters}>
                  <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={6} md={4}>
                        <FormControl fullWidth>
                          <InputLabel>Estado</InputLabel>
                          <Select
                            value={filters.estado}
                            label="Estado"
                            onChange={handleFilterChange('estado')}
                            sx={{ borderRadius: '12px' }}
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
                          sx={{ 
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px'
                            }
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
                          sx={{ 
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '12px'
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                          <Button 
                            onClick={clearFilters}
                            sx={{ 
                              borderRadius: '8px',
                              textTransform: 'none'
                            }}
                          >
                            Limpiar filtros
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Fade>
              )}
            </Paper>
          </motion.div>

          {/* Contador de resultados */}
          {!loading && devices && (
            <motion.div variants={fadeInUp}>
              <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <DevicesIcon sx={{ color: 'rgba(255,255,255,0.7)', mr: 1 }} />
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {devices.length > 0 
                    ? `Mostrando ${devices.length} dispositivo${devices.length !== 1 ? 's' : ''}`
                    : 'No se encontraron dispositivos con los filtros actuales'}
                </Typography>
              </Box>
            </motion.div>
          )}

          {/* Lista de dispositivos */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
              <CircularProgress size={60} thickness={4} sx={{ color: 'white' }} />
            </Box>
          ) : devices && devices.length > 0 ? (
            <motion.div variants={fadeInUp}>
              <Grid container spacing={4}>
                {devices.map((device, index) => (
                  <Grid item xs={12} sm={6} md={4} key={device.id}>
                    <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                      <Box>
                        <Card device={device} />
                      </Box>
                    </Zoom>
                  </Grid>
                ))}
              </Grid>
            </motion.div>
          ) : (
            <motion.div variants={fadeInUp}>
              <Paper
                sx={{
                  p: 6,
                  borderRadius: '16px',
                  textAlign: 'center',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                <DevicesIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.6 }} />
                <Typography variant="h6" gutterBottom>
                  No se encontraron dispositivos
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Prueba a cambiar los filtros de búsqueda o crea un nuevo dispositivo.
                </Typography>
                <Link to="/create-device">
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                      borderRadius: '12px',
                      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                    }}
                  >
                    Crear Dispositivo
                  </Button>
                </Link>
              </Paper>
            </motion.div>
          )}

          {/* Paginación */}
          {!loading && devices && devices.length > 0 && totalPages > 1 && (
            <motion.div variants={fadeInUp}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    sx={{
                      '& .MuiPaginationItem-root': {
                        borderRadius: '8px',
                        mx: 0.5
                      }
                    }}
                  />
                </Paper>
              </Box>
            </motion.div>
          )}
        </motion.div>
      </Container>

      <Footer />
    </div>
  );
};

export default ProductsPage;
