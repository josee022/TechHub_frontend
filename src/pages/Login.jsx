import React, { useState, useEffect } from "react";
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
  CircularProgress
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser } from "../service/api";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  // Efecto para las partículas de fondo
  useEffect(() => {
    const cleanup = () => {
      // Limpieza si es necesario
    };
    return cleanup;
  }, []);

  const validateForm = () => {
    let isValid = true;
    
    // Validar nombre de usuario
    if (!username.trim()) {
      setUsernameError("El nombre de usuario es obligatorio");
      isValid = false;
    } else {
      setUsernameError("");
    }
    
    // Validar contraseña
    if (!password) {
      setPasswordError("La contraseña es obligatoria");
      isValid = false;
    } else {
      setPasswordError("");
    }
    
    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validar formulario antes de enviar
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      const res = await loginUser({ username, password });
      console.log("Login response:", res);

      // Guardar token
      localStorage.setItem("token", res.access);
      
      // Si tenemos datos del usuario, guardarlos
      if (res.user) {
        localStorage.setItem("user", JSON.stringify(res.user));
      } else {
        // Si no tenemos datos del usuario, hacer una petición al endpoint protegido
        try {
          const userResponse = await fetch(`${API_URL}/users/protected/`, {
            headers: {
              'Authorization': `Bearer ${res.access}`
            }
          });          
          const userData = await userResponse.json();
          if (userData.user) {
            localStorage.setItem("user", JSON.stringify(userData.user));
          }
        } catch (userError) {
          console.error("Error al obtener datos del usuario:", userError);
        }
      }

      // Disparar evento de storage para actualizar el header
      window.dispatchEvent(new Event('storage'));

      navigate("/products");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError(err.response?.data?.detail || "Error al iniciar sesión. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          background: 'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 25%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 25%)',
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
              {/* Lado izquierdo - Formulario */}
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
                  initial={{ opacity: 0, x: -20 }}
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
                    Bienvenido de nuevo
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Inicia sesión para acceder a tu cuenta y gestionar tus dispositivos IoT
                  </Typography>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <TextField
                      label="Nombre de usuario"
                      variant="outlined"
                      fullWidth
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        if (usernameError) setUsernameError("");
                      }}
                      onBlur={() => {
                        if (!username.trim()) {
                          setUsernameError("El nombre de usuario es obligatorio");
                        }
                      }}
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
                      label="Contraseña"
                      variant="outlined"
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (passwordError) setPasswordError("");
                      }}
                      onBlur={() => {
                        if (!password) {
                          setPasswordError("La contraseña es obligatoria");
                        }
                      }}
                      required
                      error={!!passwordError}
                      helperText={passwordError}
                      sx={{ mb: 2 }}
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

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                      <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </Box>

                    {error && (
                      <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                      </Alert>
                    )}

                    <Button
                      type="submit"
                      variant="contained"
                      fullWidth
                      disabled={isLoading}
                      sx={{ 
                        py: 1.5, 
                        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #2563eb, #7c3aed)'
                        },
                        boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 2px 4px -1px rgba(59, 130, 246, 0.06)',
                        mb: 3
                      }}
                    >
                      {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Iniciar sesión"
                      )}
                    </Button>

                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        ¿No tienes una cuenta?{" "}
                        <Link 
                          to="/register" 
                          style={{ 
                            color: '#3b82f6',
                            fontWeight: 500,
                            textDecoration: 'none'
                          }}
                          className="hover:underline"
                        >
                          Regístrate aquí
                        </Link>
                      </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        O continúa con
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
                  </form>
                </motion.div>
              </Box>

              {/* Lado derecho - Decoración e información */}
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
                  borderTopRightRadius: 16,
                  borderBottomRightRadius: 16,
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
                    bottom: -50,
                    right: -50,
                    width: 200,
                    height: 200,
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
                    TechHub IoT Platform
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, mb: 4 }}>
                    La plataforma más avanzada para gestionar tus dispositivos IoT de forma sencilla y eficiente.
                  </Typography>

                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
                    {[
                      'Gestión centralizada de dispositivos',
                      'Análisis de datos en tiempo real',
                      'Alertas y notificaciones personalizables',
                      'Interfaz intuitiva y moderna'
                    ].map((feature, index) => (
                      <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box 
                          sx={{ 
                            width: 20, 
                            height: 20, 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            bgcolor: 'rgba(255, 255, 255, 0.2)'
                          }}
                        >
                          <Box 
                            sx={{ 
                              width: 8, 
                              height: 8, 
                              borderRadius: '50%', 
                              bgcolor: 'white'
                            }} 
                          />
                        </Box>
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    ))}
                  </Box>
                </motion.div>
              </Box>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoginPage;
