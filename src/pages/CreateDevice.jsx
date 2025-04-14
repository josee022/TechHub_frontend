import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDevice } from "../service/api";
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
  Stepper,
  Step,
  StepLabel,
  Grid,
  IconButton,
  CircularProgress,
  Chip,
  Divider,
  Tooltip
} from "@mui/material";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import { motion, AnimatePresence } from "framer-motion";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DevicesIcon from '@mui/icons-material/Devices';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import MemoryIcon from '@mui/icons-material/Memory';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const deviceTypes = [
  { value: "Sensor", label: "Sensor", icon: "🔍" },
  { value: "Actuador", label: "Actuador", icon: "⚙️" },
  { value: "Gateway", label: "Gateway", icon: "🔌" },
  { value: "Cámara", label: "Cámara", icon: "📷" },
  { value: "Controlador", label: "Controlador", icon: "🎮" },
  { value: "Termostato", label: "Termostato", icon: "🌡️" },
  { value: "Iluminación", label: "Iluminación", icon: "💡" },
  { value: "Seguridad", label: "Seguridad", icon: "🔒" },
  { value: "Sensor de Humedad", label: "Sensor de Humedad", icon: "💧" },
  { value: "Medidor de Energía", label: "Medidor de Energía", icon: "🔋" },
  { value: "Sensor de Gas", label: "Sensor de Gas", icon: "🧪" },
  { value: "Otro", label: "Otro", icon: "📱" }
];

// Pasos del formulario
const steps = ['Información básica', 'Detalles técnicos', 'Imagen', 'Resumen'];

// Animaciones para transiciones entre pasos
const pageVariants = {
  initial: { opacity: 0, x: 100 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -100 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

// Componente para el contenido animado
const MotionDiv = motion.div;

const CreateDevice = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    estado: true,
    ubicacion: "",
    descripcion: "",
    modelo_firmware: "",
    imagen: null,
  });

  // Función para validar el paso actual
  const validateStep = () => {
    const errors = {};
    
    if (activeStep === 0) {
      if (!formData.nombre.trim()) errors.nombre = "El nombre es obligatorio";
      if (!formData.tipo) errors.tipo = "El tipo de dispositivo es obligatorio";
    } else if (activeStep === 1) {
      if (!formData.descripcion.trim()) errors.descripcion = "La descripción es obligatoria";
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Manejar cambio de paso
  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

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

  // Eliminar imagen
  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imagen: null }));
    setPreviewUrl(null);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const deviceFormData = new FormData();
      
      // Añadir todos los campos al FormData
      Object.keys(formData).forEach(key => {
        if (key === 'imagen' && formData[key]) {
          deviceFormData.append(key, formData[key]);
        } else if (key !== 'imagen') {
          deviceFormData.append(key, formData[key]);
        }
      });

      await createDevice(deviceFormData);
      navigate("/products");
    } catch (error) {
      console.error("Error al crear el dispositivo:", error);
      setError("Error al crear el dispositivo. Por favor, inténtalo de nuevo.");
      setActiveStep(0); // Volver al primer paso en caso de error
    } finally {
      setLoading(false);
    }
  };

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "estado" ? checked : value
    }));

    // Limpiar error de validación cuando el usuario escribe
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  // Manejar selección de tipo de dispositivo
  const handleTypeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      tipo: value
    }));
    
    if (validationErrors.tipo) {
      setValidationErrors(prev => ({
        ...prev,
        tipo: null
      }));
    }
  };

  // Renderizar el contenido según el paso actual
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <MotionDiv
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'medium', color: 'text.primary' }}>
              Información básica del dispositivo
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nombre del Dispositivo"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  error={!!validationErrors.nombre}
                  helperText={validationErrors.nombre}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px'
                    }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
                  Tipo de dispositivo
                </Typography>
                
                {validationErrors.tipo && (
                  <Typography variant="caption" color="error" sx={{ mb: 1, display: 'block' }}>
                    {validationErrors.tipo}
                  </Typography>
                )}
                
                <Grid container spacing={2}>
                  {deviceTypes.map((type) => (
                    <Grid item xs={6} sm={4} md={3} key={type.value}>
                      <Paper
                        elevation={0}
                        onClick={() => handleTypeChange(type.value)}
                        sx={{
                          p: 2,
                          textAlign: 'center',
                          cursor: 'pointer',
                          borderRadius: '12px',
                          border: '2px solid',
                          borderColor: formData.tipo === type.value ? 'primary.main' : 'transparent',
                          bgcolor: formData.tipo === type.value ? 'primary.lighter' : 'background.paper',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: formData.tipo === type.value ? 'primary.lighter' : 'grey.50',
                            transform: 'translateY(-3px)',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                          }
                        }}
                      >
                        <Typography variant="h5" sx={{ mb: 1 }}>
                          {type.icon}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: formData.tipo === type.value ? 'bold' : 'regular' }}>
                          {type.label}
                        </Typography>
                        {formData.tipo === type.value && (
                          <CheckCircleIcon 
                            color="primary" 
                            sx={{ 
                              position: 'absolute', 
                              top: 8, 
                              right: 8, 
                              fontSize: 18 
                            }} 
                          />
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                
              </Grid>
              
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.estado}
                      onChange={handleChange}
                      name="estado"
                      color="primary"
                    />
                  }
                  label={
                    <Typography sx={{ color: formData.estado ? 'success.main' : 'error.main', fontWeight: 'medium' }}>
                      {formData.estado ? "Dispositivo Activo" : "Dispositivo Inactivo"}
                    </Typography>
                  }
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ubicación"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Ej: Sala de servidores, Planta 2"
                  InputProps={{
                    startAdornment: <LocationOnIcon color="action" sx={{ mr: 1 }} />,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px'
                    }
                  }}
                />
              </Grid>
            </Grid>
          </MotionDiv>
        );
      case 1:
        return (
          <MotionDiv
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'medium', color: 'text.primary' }}>
              Detalles técnicos
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Modelo de Firmware"
                  name="modelo_firmware"
                  value={formData.modelo_firmware}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="Ej: v2.1.0-stable"
                  InputProps={{
                    startAdornment: <MemoryIcon color="action" sx={{ mr: 1 }} />,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px'
                    }
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
                  rows={6}
                  variant="outlined"
                  required
                  error={!!validationErrors.descripcion}
                  helperText={validationErrors.descripcion || "Describe las características y funcionalidades del dispositivo"}
                  InputProps={{
                    startAdornment: <DescriptionIcon color="action" sx={{ mr: 1, alignSelf: 'flex-start', mt: 2 }} />,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px'
                    }
                  }}
                />
              </Grid>
            </Grid>
          </MotionDiv>
        );
      case 2:
        return (
          <MotionDiv
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'medium', color: 'text.primary' }}>
              Imagen del dispositivo
            </Typography>
            
            <Box 
              sx={{ 
                border: '2px dashed',
                borderColor: 'primary.light',
                borderRadius: '16px',
                p: 4,
                textAlign: 'center',
                bgcolor: 'primary.lighter',
                mb: 3
              }}
            >
              {!previewUrl ? (
                <Box>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="image-upload"
                    type="file"
                    onChange={handleImageChange}
                  />
                  <label htmlFor="image-upload">
                    <Button
                      variant="contained"
                      component="span"
                      startIcon={<CloudUploadIcon />}
                      sx={{ 
                        mb: 2,
                        borderRadius: '12px',
                        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                        boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                          boxShadow: '0 6px 20px 0 rgba(59, 130, 246, 0.6)',
                        }
                      }}
                    >
                      Subir Imagen
                    </Button>
                  </label>
                  <Typography variant="body2" color="textSecondary">
                    Arrastra una imagen o haz clic para seleccionar
                  </Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                    Formatos aceptados: JPG, PNG, GIF. Tamaño máximo: 5MB
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ position: 'relative' }}>
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: -16, 
                      right: -16, 
                      zIndex: 1 
                    }}
                  >
                    <IconButton 
                      onClick={handleRemoveImage}
                      sx={{ 
                        bgcolor: 'error.main', 
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'error.dark'
                        }
                      }}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Box 
                    sx={{ 
                      maxWidth: '100%', 
                      maxHeight: '300px',
                      overflow: 'hidden',
                      borderRadius: '12px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                    }}
                  >
                    <img
                      src={previewUrl}
                      alt="Vista previa"
                      style={{ 
                        width: '100%',
                        height: 'auto',
                        maxHeight: '300px',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ mt: 2, fontWeight: 'medium' }}>
                    Imagen seleccionada correctamente
                  </Typography>
                </Box>
              )}
            </Box>
            
            <Alert severity="info" sx={{ borderRadius: '12px' }}>
              <Typography variant="body2">
                La imagen ayuda a identificar visualmente el dispositivo en el catálogo. Si no subes una imagen, se mostrará una imagen genérica.
              </Typography>
            </Alert>
          </MotionDiv>
        );
      case 3:
        return (
          <MotionDiv
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'medium', color: 'text.primary' }}>
              Resumen del dispositivo
            </Typography>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                borderRadius: '16px',
                bgcolor: 'grey.50',
                mb: 4
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                      Nombre
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {formData.nombre || "No especificado"}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                      Tipo
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip 
                        label={formData.tipo || "No especificado"} 
                        color="primary" 
                        size="small"
                        sx={{ fontWeight: 'medium' }}
                      />
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                      Estado
                    </Typography>
                    <Box>
                      <Chip 
                        label={formData.estado ? "Activo" : "Inactivo"} 
                        color={formData.estado ? "success" : "error"} 
                        size="small"
                        sx={{ fontWeight: 'medium' }}
                      />
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                      Ubicación
                    </Typography>
                    <Typography variant="subtitle1">
                      {formData.ubicacion || "No especificada"}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                      Modelo de Firmware
                    </Typography>
                    <Typography variant="subtitle1">
                      {formData.modelo_firmware || "No especificado"}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="textSecondary">
                      Descripción
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-wrap' }}>
                      {formData.descripcion || "No especificada"}
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      Imagen
                    </Typography>
                    {previewUrl ? (
                      <Box 
                        sx={{ 
                          mt: 1,
                          maxWidth: '200px',
                          maxHeight: '150px',
                          overflow: 'hidden',
                          borderRadius: '8px',
                          border: '1px solid',
                          borderColor: 'grey.300'
                        }}
                      >
                        <img
                          src={previewUrl}
                          alt="Vista previa"
                          style={{ 
                            width: '100%',
                            height: 'auto',
                            maxHeight: '150px',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>
                    ) : (
                      <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
                        No se ha seleccionado ninguna imagen
                      </Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Paper>
            
            <Alert severity="success" sx={{ borderRadius: '12px' }}>
              <Typography variant="body2">
                ¡Todo listo! Revisa la información y haz clic en "Crear Dispositivo" para finalizar.
              </Typography>
            </Alert>
          </MotionDiv>
        );
      default:
        return "Paso desconocido";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      <Header />
      <Container maxWidth="md" className="py-20">
        <Paper 
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '24px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <DevicesIcon sx={{ fontSize: 32, color: 'primary.main', mr: 2 }} />
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Crear Nuevo Dispositivo
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ mb: 4, borderRadius: '12px' }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setError(null)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {error}
            </Alert>
          )}

          <Stepper 
            activeStep={activeStep} 
            alternativeLabel
            sx={{ 
              mb: 4,
              '& .MuiStepLabel-root': {
                color: 'grey.700'
              },
              '& .MuiStepIcon-root': {
                fontSize: 28,
                '&.Mui-active': {
                  color: 'primary.main'
                },
                '&.Mui-completed': {
                  color: 'success.main'
                }
              }
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ minHeight: '350px', mb: 4 }}>
            <AnimatePresence mode="wait">
              {getStepContent(activeStep)}
            </AnimatePresence>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
              sx={{ 
                borderRadius: '12px',
                px: 3
              }}
            >
              Atrás
            </Button>
            
            <Box>
              <Button
                variant="outlined"
                onClick={() => navigate("/products")}
                sx={{ 
                  mr: 2,
                  borderRadius: '12px',
                  px: 3
                }}
              >
                Cancelar
              </Button>
              
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={loading}
                  sx={{ 
                    borderRadius: '12px',
                    px: 4,
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                    boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                      boxShadow: '0 6px 20px 0 rgba(59, 130, 246, 0.6)',
                    }
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Crear Dispositivo"
                  )}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    borderRadius: '12px',
                    px: 3,
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                    boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                      boxShadow: '0 6px 20px 0 rgba(59, 130, 246, 0.6)',
                    }
                  }}
                >
                  Siguiente
                </Button>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default CreateDevice;
