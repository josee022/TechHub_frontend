import React from "react";
import { Container, Typography, Box, Grid, Paper, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import DevicesIcon from '@mui/icons-material/Devices';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import JavascriptIcon from '@mui/icons-material/Javascript';
import LanguageIcon from '@mui/icons-material/Language';

const FeatureCard = ({ icon, title, description, color, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <Paper 
        elevation={0} 
        className="h-full p-8 rounded-2xl border border-gray-100 bg-white hover:shadow-xl transition-all duration-300"
      >
        <div className={`w-16 h-16 rounded-xl mb-6 flex items-center justify-center bg-${color}-50`}>
          {icon}
        </div>
        <Typography variant="h5" className={`font-bold text-${color}-600 mb-4`}>
          {title}
        </Typography>
        <Typography variant="body1" className="text-gray-600">
          {description}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <DashboardIcon sx={{ fontSize: 32, color: "#3b82f6" }} />,
      title: "Panel de Control Intuitivo",
      description: "Interfaz diseñada para facilitar la gestión de todos tus dispositivos IoT desde un único lugar, con controles intuitivos y visualización en tiempo real.",
      color: "blue",
      delay: 0.1
    },
    {
      icon: <BarChartIcon sx={{ fontSize: 32, color: "#10b981" }} />,
      title: "Análisis Avanzado de Datos",
      description: "Transforma datos brutos en insights accionables con nuestras herramientas de análisis potenciadas por IA para optimizar el rendimiento de tus dispositivos.",
      color: "green",
      delay: 0.2
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 32, color: "#6366f1" }} />,
      title: "Seguridad de Nivel Empresarial",
      description: "Protección robusta para tus dispositivos y datos con cifrado de extremo a extremo, autenticación multifactor y auditorías de seguridad regulares.",
      color: "indigo",
      delay: 0.3
    },
    {
      icon: <NotificationsActiveIcon sx={{ fontSize: 32, color: "#ec4899" }} />,
      title: "Alertas Personalizables",
      description: "Configura alertas inteligentes basadas en umbrales específicos para recibir notificaciones inmediatas cuando tus dispositivos requieren atención.",
      color: "pink",
      delay: 0.4
    },
    {
      icon: <DevicesIcon sx={{ fontSize: 32, color: "#8b5cf6" }} />,
      title: "Compatibilidad Universal",
      description: "Integración perfecta con una amplia gama de dispositivos IoT y protocolos de comunicación, garantizando flexibilidad para tu ecosistema.",
      color: "purple",
      delay: 0.5
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 32, color: "#f59e0b" }} />,
      title: "Monitoreo en Tiempo Real",
      description: "Visualiza el estado y rendimiento de tus dispositivos con actualizaciones instantáneas, permitiéndote tomar decisiones informadas rápidamente.",
      color: "yellow",
      delay: 0.6
    }
  ];

  // Tecnologías con iconos y emojis
  const technologies = [
    { name: "React", icon: <span className="text-4xl">⚛️</span>, tooltip: "React" },
    { name: "Django", icon: <span className="text-4xl">🐍</span>, tooltip: "Django/Python" },
    { name: "JavaScript", icon: <JavascriptIcon sx={{ fontSize: 40, color: "#f7df1e" }} />, tooltip: "JavaScript" },
    { name: "PostgreSQL", icon: <StorageIcon sx={{ fontSize: 40, color: "#336791" }} />, tooltip: "PostgreSQL" },
    { name: "Cloudinary", icon: <CloudIcon sx={{ fontSize: 40, color: "#3448c5" }} />, tooltip: "Cloudinary" },
    { name: "REST API", icon: <LanguageIcon sx={{ fontSize: 40, color: "#61dafb" }} />, tooltip: "REST API" },
  ];

  return (
    <Box className="py-24 bg-gray-50">
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Typography 
            variant="overline" 
            className="text-blue-600 font-medium tracking-widest mb-2 block"
          >
            FUNCIONALIDADES DESTACADAS
          </Typography>
          <Typography
            variant="h2"
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Potencia tu ecosistema IoT
          </Typography>
          <Typography
            variant="h6"
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Descubre cómo nuestras características avanzadas pueden transformar la forma en que gestionas tus dispositivos conectados.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
        
        {/* Sección de tecnologías con iconos/emojis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <Typography variant="h5" className="text-gray-700 mb-8">
            Tecnologías con las que trabajamos
          </Typography>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {technologies.map((tech, index) => (
              <Tooltip title={tech.tooltip} key={index}>
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md">
                    {tech.icon}
                  </div>
                  <Typography variant="body2" className="font-medium text-gray-700">
                    {tech.name}
                  </Typography>
                </motion.div>
              </Tooltip>
            ))}
          </div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Features;
