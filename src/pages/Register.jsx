import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  CircularProgress,
  Stepper,
  Step,
  StepLabel
} from "@mui/material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../service/api";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SecurityIcon from '@mui/icons-material/Security';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  // Validaciones
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const steps = ['Información personal', 'Credenciales', 'Confirmación'];

  const validateUsername = () => {
    if (!username.trim()) {
      setUsernameError("El nombre de usuario es obligatorio");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const validateEmail = () => {
    if (!email.trim()) {
      setEmailError("El correo electrónico es obligatorio");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Introduce un correo electrónico válido");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("La contraseña es obligatoria");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword) {
      setConfirmPasswordError("Debes confirmar la contraseña");
      return false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Las contraseñas no coinciden");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleNext = () => {
    if (activeStep === 0) {
      const isUsernameValid = validateUsername();
      const isEmailValid = validateEmail();
      
      if (isUsernameValid && isEmailValid) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    } else if (activeStep === 1) {
      const isPasswordValid = validatePassword();
      const isConfirmPasswordValid = validateConfirmPassword();
      
      if (isPasswordValid && isConfirmPasswordValid) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    try {
      // 1️⃣ Registro
      await registerUser({ username, email, password });

      // 2️⃣ Login automático
      const res = await loginUser({ username, password });
      const token = res.access;

      // 3️⃣ Guardar token y usuario
      localStorage.setItem("token", token);

      // 4️⃣ Redirigir
      navigate("/login");
    } catch (err) {
      console.error("Error al registrar:", err);
      if (err.response?.data) {
        console.log("Detalles del error:", err.response.data);
        
        // Manejar errores específicos
        if (err.response.data.username) {
          setError(`Error de usuario: ${err.response.data.username[0]}`);
        } else if (err.response.data.email) {
          setError(`Error de email: ${err.response.data.email[0]}`);
        } else if (err.response.data.password) {
          setError(`Error de contraseña: ${err.response.data.password[0]}`);
        } else {
          setError("Error al registrar. Verifica los datos.");
        }
      } else {
        setError("Error al registrar. Verifica los datos.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Renderizar el paso actual
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              label="Nombre de usuario"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              error={!!usernameError}
              helperText={usernameError}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={!!emailError}
              helperText={emailError}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              label="Contraseña"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              error={!!passwordError}
              helperText={passwordError}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Confirmar Contraseña"
              variant="outlined"
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={toggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </>
        );
      case 2:
        return (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Confirma tus datos
            </Typography>
            <Box sx={{ textAlign: 'left', mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Nombre de usuario:</strong> {username}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Correo electrónico:</strong> {email}
              </Typography>
              <Typography variant="body1">
                <strong>Contraseña:</strong> ••••••••
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Al hacer clic en "Completar registro", aceptas nuestros términos y condiciones y política de privacidad.
            </Typography>
          </Box>
        );
      default:
        return 'Paso desconocido';
    }
  };

  return (
    <Box 
      className="min-h-screen flex justify-center items-center relative overflow-hidden"
      sx={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      }}
    >
      {/* Elementos decorativos de fondo */}
      <Box 
        className="absolute inset-0 z-0 overflow-hidden opacity-20"
        sx={{
          background: 'radial-gradient(circle at 70% 50%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 25%), radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 25%)',
        }}
      >
        {/* Partículas decorativas */}
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            className="absolute rounded-full"
            sx={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              background: 'rgba(255, 255, 255, 0.1)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            }}
          />
        ))}
      </Box>

      <Container maxWidth="lg" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={24}
            sx={{
              maxWidth: 1000,
              mx: 'auto',
              overflow: 'hidden',
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              {/* Lado izquierdo - Imagen y descripción */}
              <Box 
                sx={{ 
                  flex: { xs: '1', md: '1 1 50%' },
                  display: { xs: 'none', md: 'flex' },
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 6,
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  color: 'white',
                  borderTopLeftRadius: 16,
                  borderBottomLeftRadius: 16,
                }}
              >
                {/* Elementos decorativos */}
                <Box 
                  sx={{ 
                    position: 'absolute',
                    top: -50,
                    left: -50,
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                  }} 
                />
                <Box 
                  sx={{ 
                    position: 'absolute',
                    bottom: -30,
                    right: -30,
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                  }} 
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{ zIndex: 1, textAlign: 'center' }}
                >
                  <Box 
                    component="img"
                    src="/images/iot-devices.jpg"
                    alt="IoT Devices"
                    sx={{ 
                      width: '100%',
                      maxWidth: 400,
                      height: 'auto',
                      borderRadius: 3,
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
                      mb: 4
                    }}
                  />

                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                    Únete a TechHub
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, mb: 4 }}>
                    Crea tu cuenta y comienza a gestionar tus dispositivos IoT con nuestra plataforma intuitiva y potente.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
                    {[
                      'Gestión centralizada de dispositivos',
                      'Análisis de datos en tiempo real',
                      'Alertas y notificaciones personalizables',
                      'Interfaz intuitiva y moderna'
                    ].map((feature, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircleOutlineIcon fontSize="small" />
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                </motion.div>
              </Box>

              {/* Lado derecho - Formulario */}
              <Box 
                sx={{ 
                  flex: { xs: '1', md: '1 1 50%' }, 
                  p: { xs: 4, sm: 6 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 1,
                      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                      backgroundClip: 'text',
                      textFillColor: 'transparent',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Crea tu cuenta
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Completa el formulario para unirte a la comunidad TechHub
                  </Typography>

                  <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>

                  <form onSubmit={handleSubmit}>
                    {error && (
                      <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                      </Alert>
                    )}

                    {getStepContent(activeStep)}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Atrás
                      </Button>
                      <Box>
                        {activeStep === steps.length - 1 ? (
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            sx={{ 
                              py: 1.5, 
                              px: 3,
                              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                              '&:hover': {
                                background: 'linear-gradient(90deg, #2563eb, #7c3aed)'
                              },
                              boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -1px rgba(59, 130, 246, 0.06)',
                            }}
                          >
                            {isLoading ? (
                              <CircularProgress size={24} color="inherit" />
                            ) : (
                              "Completar registro"
                            )}
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ 
                              py: 1.5, 
                              px: 3,
                              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                              '&:hover': {
                                background: 'linear-gradient(90deg, #2563eb, #7c3aed)'
                              },
                              boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -1px rgba(59, 130, 246, 0.06)',
                            }}
                          >
                            Siguiente
                          </Button>
                        )}
                      </Box>
                    </Box>

                    {activeStep === 0 && (
                      <>
                        <Box sx={{ textAlign: 'center', mt: 4, mb: 3 }}>
                          <Typography variant="body2" color="text.secondary">
                            ¿Ya tienes una cuenta?{" "}
                            <Link 
                              to="/login" 
                              style={{ 
                                color: '#3b82f6',
                                fontWeight: 500,
                                textDecoration: 'none'
                              }}
                              className="hover:underline"
                            >
                              Inicia sesión aquí
                            </Link>
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 3 }}>
                          <Typography variant="body2" color="text.secondary">
                            O regístrate con
                          </Typography>
                        </Divider>

                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                          <IconButton 
                            sx={{ 
                              border: '1px solid #e2e8f0',
                              borderRadius: 2,
                              p: 1.5,
                              '&:hover': {
                                bgcolor: '#f8fafc'
                              }
                            }}
                          >
                            <GoogleIcon sx={{ color: '#ea4335' }} />
                          </IconButton>
                          <IconButton 
                            sx={{ 
                              border: '1px solid #e2e8f0',
                              borderRadius: 2,
                              p: 1.5,
                              '&:hover': {
                                bgcolor: '#f8fafc'
                              }
                            }}
                          >
                            <GitHubIcon />
                          </IconButton>
                          <IconButton 
                            sx={{ 
                              border: '1px solid #e2e8f0',
                              borderRadius: 2,
                              p: 1.5,
                              '&:hover': {
                                bgcolor: '#f8fafc'
                              }
                            }}
                          >
                            <LinkedInIcon sx={{ color: '#0077b5' }} />
                          </IconButton>
                        </Box>
                      </>
                    )}
                  </form>
                </motion.div>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default RegisterPage;
