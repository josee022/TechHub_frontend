import React, { useEffect } from "react";
import { Container, Grid, Button, Typography, Box, Paper } from "@mui/material";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import Features from "../components/Home/Features";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';

// Animaciones para elementos que entran en la pantalla
const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const HomePage = () => {
  // Efecto para el scroll suave
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      <Header />

      {/* Hero Section con animaciones */}
      <Box 
        className="relative overflow-hidden pt-20 pb-40"
        sx={{
          background: 'radial-gradient(circle at 30% 107%, rgba(32, 72, 243, 0.2) 0%, rgba(32, 72, 243, 0.2) 5%, rgba(103, 61, 255, 0.2) 45%, rgba(142, 53, 240, 0.2) 60%, rgba(193, 42, 227, 0.2) 90%)',
          boxShadow: 'inset 0 -10px 20px -5px rgba(0,0,0,0.1)'
        }}
      >
        {/* Partículas decorativas */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 10 + 5 + 'px',
                height: Math.random() * 10 + 5 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                opacity: Math.random() * 0.5 + 0.2
              }}
            />
          ))}
        </div>
        
        <Container maxWidth="lg" className="relative z-10">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="initial"
                animate="animate"
                variants={staggerContainer}
                className="space-y-6"
              >
                <motion.div variants={fadeInUp}>
                  <Typography 
                    variant="overline" 
                    className="text-blue-300 font-medium tracking-widest"
                  >
                    PLATAFORMA IOT DE ÚLTIMA GENERACIÓN
                  </Typography>
                </motion.div>
                
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h1"
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
                  >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                      TechHub
                    </span>
                    <br />
                    <span className="text-white">
                      Gestión IoT Inteligente
                    </span>
                  </Typography>
                </motion.div>
                
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h5"
                    className="text-lg text-blue-100 opacity-90 max-w-lg"
                  >
                    Transforma tu ecosistema de dispositivos con nuestra plataforma 
                    de gestión IoT potenciada con análisis en tiempo real e inteligencia artificial.
                  </Typography>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="pt-4 flex flex-wrap gap-4">
                  <Button
                    component={Link}
                    to="/products"
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                  >
                    Explorar Dispositivos
                  </Button>
                  
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="large"
                    className="border-blue-300 text-blue-100 hover:bg-blue-900/30 px-8 py-3 rounded-full transition-all duration-300"
                  >
                    Iniciar Sesión
                  </Button>
                </motion.div>
                
                <motion.div variants={fadeInUp} className="pt-8">
                  <Box className="flex items-center gap-6">
                    <Box className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-10 h-10 rounded-full border-2 border-indigo-900 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs"
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </Box>
                    <Box>
                      <Typography className="text-blue-100 text-sm">
                        <span className="font-bold">+500</span> empresas confían en nosotros
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </motion.div>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative"
              >
                {/* Círculo decorativo */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20"></div>
                
                {/* Imagen principal con efecto de flotación */}
                <div className="relative bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-2 rounded-2xl backdrop-blur-sm shadow-2xl">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img
                      src="/images/iot-devices.jpg"
                      alt="TechHub IoT Dashboard"
                      className="w-full h-auto rounded-xl shadow-lg"
                    />
                  </motion.div>
                  
                  {/* Tarjetas flotantes */}
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="absolute -left-10 top-1/4 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-3 max-w-[180px]"
                  >
                    <Box className="flex items-center gap-2">
                      <DevicesIcon className="text-blue-600" />
                      <Typography variant="subtitle2" className="font-bold text-gray-800">
                        Dispositivos Conectados
                      </Typography>
                    </Box>
                    <Typography variant="h6" className="font-bold text-blue-600">
                      +1,245
                    </Typography>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="absolute -right-10 bottom-1/4 bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-3 max-w-[180px]"
                  >
                    <Box className="flex items-center gap-2">
                      <SpeedIcon className="text-green-600" />
                      <Typography variant="subtitle2" className="font-bold text-gray-800">
                        Rendimiento
                      </Typography>
                    </Box>
                    <Typography variant="h6" className="font-bold text-green-600">
                      99.8%
                    </Typography>
                  </motion.div>
                </div>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
        
        {/* Onda decorativa en la parte inferior */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#f9fafb" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </Box>

      {/* Sección de estadísticas */}
      <Box className="bg-gray-50 py-20">
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {[
              { number: "99.9%", label: "Tiempo de actividad", color: "blue" },
              { number: "24/7", label: "Soporte técnico", color: "indigo" },
              { number: "+500", label: "Clientes satisfechos", color: "purple" },
              { number: "+10k", label: "Dispositivos gestionados", color: "pink" }
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Paper elevation={0} className="p-6 text-center h-full bg-white rounded-xl border border-gray-100">
                    <Typography 
                      variant="h3" 
                      className={`font-bold text-${stat.color}-600 mb-2`}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" className="text-gray-600">
                      {stat.label}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Características mejoradas */}
      <Features />
      
      {/* Sección CTA */}
      <Box className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute w-96 h-96 bg-blue-400 rounded-full opacity-10 -top-20 -right-20"></div>
          <div className="absolute w-96 h-96 bg-indigo-400 rounded-full opacity-10 -bottom-20 -left-20"></div>
        </div>
        
        <Container maxWidth="md" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Typography variant="h3" className="text-white font-bold mb-6">
              ¿Listo para transformar tu gestión de dispositivos IoT?
            </Typography>
            <Typography variant="h6" className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Únete a cientos de empresas que ya han mejorado su eficiencia operativa con TechHub.
            </Typography>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              size="large"
              className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-3 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              Comenzar Ahora
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
