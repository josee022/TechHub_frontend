import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDeviceDetails, updateDevice } from "../service/api";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Box,
  Alert,
  Grid,
  CircularProgress,
  Chip,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Tooltip,
  Fade,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import DevicesIcon from '@mui/icons-material/Devices';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const EditDevice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    estado: true,
    ubicacion: "",
    descripcion: "",
    modelo_firmware: "",
    imagen: null,
  });

  // Cargar datos del dispositivo
  useEffect(() => {
    const fetchDevice = async () => {
      try {
        setLoading(true);
        const data = await getDeviceDetails(id);
        console.log("Device data:", data);
        
        setFormData({
          nombre: data.nombre || "",
          tipo: data.tipo || "",
          estado: data.estado,
          ubicacion: data.ubicacion || "",
          descripcion: data.descripcion || "",
          modelo_firmware: data.modelo_firmware || "",
        });

        // Si hay una imagen, establecer la preview
        if (data.imagen_url) {
          setPreviewUrl(data.imagen_url);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el dispositivo:", error);
        setError("No se pudo cargar el dispositivo o no tienes permisos para editarlo");
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id]);

  // Manejar cambio de imagen
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, imagen: file }));
      
      // Crear URL para preview
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const deviceFormData = new FormData();
      
      // Añadir todos los campos excepto imagen
      Object.keys(formData).forEach((key) => {
        if (key !== "imagen") {
          deviceFormData.append(key, formData[key]);
        }
      });

      // Añadir imagen si se seleccionó una nueva
      if (formData.imagen instanceof File) {
        deviceFormData.append("imagen", formData.imagen);
      }

      await updateDevice(id, deviceFormData);
      setSuccess(true);
      
      // Redirigir después de un breve retraso para mostrar el mensaje de éxito
      setTimeout(() => {
        navigate(`/device/${id}`);
      }, 1500);
    } catch (error) {
      console.error("Error al actualizar el dispositivo:", error);
      setError("Error al actualizar el dispositivo. Por favor, inténtalo de nuevo.");
      setSubmitting(false);
    }
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "estado" ? checked : value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
        <Header />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ 
            display: "flex", 
            flexDirection: "column",
            justifyContent: "center", 
            alignItems: "center", 
            minHeight: "60vh",
            textAlign: "center"
          }}>
            <CircularProgress size={60} thickness={4} sx={{ mb: 3, color: 'white' }} />
            <Typography variant="h5" sx={{ fontWeight: 500, mb: 1, color: 'white' }}>
              Cargando dispositivo
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Estamos obteniendo la información del dispositivo...
            </Typography>
          </Box>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      <Header />
      <Container maxWidth="lg" sx={{ 
        py: 4, 
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 107%, rgba(32, 72, 243, 0.2) 0%, rgba(32, 72, 243, 0.2) 5%, rgba(103, 61, 255, 0.2) 45%, rgba(142, 53, 240, 0.2) 60%, rgba(193, 42, 227, 0.2) 90%)',
          pointerEvents: 'none',
          zIndex: 0
        }
      }}>
        {success && (
          <Fade in={success}>
            <Alert 
              severity="success" 
              sx={{ 
                position: 'fixed', 
                top: 100, 
                left: '50%', 
                transform: 'translateX(-50%)', 
                zIndex: 9999,
                boxShadow: theme.shadows[4],
                width: 'auto',
                maxWidth: '90%'
              }}
              icon={<CheckCircleIcon fontSize="inherit" />}
            >
              ¡Dispositivo actualizado correctamente! Redirigiendo...
            </Alert>
          </Fade>
        )}
        
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(`/device/${id}`)}
            variant="outlined"
            sx={{ 
              mr: 2,
              borderRadius: '8px',
              borderWidth: '2px',
              color: 'white',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              '&:hover': {
                borderWidth: '2px',
                borderColor: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            Volver
          </Button>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 600, 
              color: 'white',
              textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <DevicesIcon sx={{ mr: 1, color: 'rgba(255, 255, 255, 0.9)' }} />
            Editar Dispositivo
          </Typography>
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 4, 
              borderRadius: '8px',
              boxShadow: theme.shadows[2],
              position: 'relative',
              zIndex: 1
            }}
          >
            {error}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ position: 'relative', zIndex: 1 }}>
          {/* Imagen y estado del dispositivo */}
          <Grid item xs={12} md={4}>
            <Card 
              elevation={3} 
              sx={{ 
                borderRadius: '16px', 
                overflow: 'hidden',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)',
                }
              }}
            >
              <Box 
                sx={{ 
                  position: 'relative',
                  height: 250,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}
              >
                {previewUrl ? (
                  <CardMedia
                    component="img"
                    image={previewUrl}
                    alt={formData.nombre}
                    sx={{
                      height: '100%',
                      objectFit: 'contain',
                      p: 2
                    }}
                  />
                ) : (
                  <DevicesIcon sx={{ fontSize: 100, color: 'rgba(0, 0, 0, 0.2)' }} />
                )}
                
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    left: 0, 
                    right: 0, 
                    p: 1, 
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    hidden
                    onChange={handleImageChange}
                  />
                  <label htmlFor="icon-button-file">
                    <Button
                      component="span"
                      variant="contained"
                      startIcon={<PhotoCameraIcon />}
                      sx={{ 
                        mr: 1,
                        borderRadius: '8px',
                        textTransform: 'none',
                        boxShadow: theme.shadows[2],
                        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                        }
                      }}
                    >
                      {previewUrl ? "Cambiar" : "Subir imagen"}
                    </Button>
                  </label>
                  
                  {previewUrl && (
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        setFormData(prev => ({ ...prev, imagen: null }));
                        setPreviewUrl(null);
                      }}
                      sx={{ 
                        borderRadius: '8px',
                        textTransform: 'none',
                        boxShadow: theme.shadows[2]
                      }}
                    >
                      Eliminar
                    </Button>
                  )}
                </Box>
              </Box>
              
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                    Estado del dispositivo
                  </Typography>
                  <Chip 
                    label={formData.estado ? "Activo" : "Inactivo"} 
                    color={formData.estado ? "success" : "default"}
                    sx={{ 
                      fontWeight: 'bold',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  />
                </Box>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.estado}
                      onChange={handleChange}
                      name="estado"
                      color="primary"
                      sx={{ 
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: theme.palette.success.main,
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: theme.palette.success.light,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body1">
                      {formData.estado ? "Dispositivo activo" : "Dispositivo inactivo"}
                    </Typography>
                  }
                  sx={{ mt: 1 }}
                />
                
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  <InfoIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                  Cambia el estado del dispositivo según esté en funcionamiento o no.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Formulario principal */}
          <Grid item xs={12} md={8}>
            <Card 
              elevation={3} 
              component="form"
              onSubmit={handleSubmit}
              sx={{ 
                borderRadius: '16px',
                p: 3,
                transition: 'transform 0.2s, box-shadow 0.2s',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.2)',
                }
              }}
            >
              <Typography 
                variant="h6" 
                component="h2" 
                sx={{ 
                  mb: 3, 
                  pb: 2, 
                  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <SettingsIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                Información del dispositivo
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre del Dispositivo"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    InputProps={{
                      sx: { borderRadius: '8px' }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tipo de Dispositivo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    InputProps={{
                      sx: { borderRadius: '8px' }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ubicación"
                    name="ubicacion"
                    value={formData.ubicacion}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <LocationOnIcon color="action" sx={{ mr: 1 }} />,
                      sx: { borderRadius: '8px' }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Modelo/Firmware"
                    name="modelo_firmware"
                    value={formData.modelo_firmware}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      sx: { borderRadius: '8px' }
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Descripción"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    variant="outlined"
                    InputProps={{
                      startAdornment: <DescriptionIcon color="action" sx={{ mr: 1, mt: 1 }} />,
                      sx: { borderRadius: '8px' }
                    }}
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid rgba(0, 0, 0, 0.1)', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={submitting ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                  disabled={submitting}
                  sx={{ 
                    px: 4, 
                    py: 1.5,
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(25, 118, 210, 0.3)',
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                    transition: 'all 0.3s',
                    '&:hover': {
                      boxShadow: '0 6px 15px rgba(25, 118, 210, 0.4)',
                      transform: 'translateY(-2px)',
                      background: 'linear-gradient(90deg, #2563eb, #7c3aed)'
                    }
                  }}
                >
                  {submitting ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default EditDevice;
