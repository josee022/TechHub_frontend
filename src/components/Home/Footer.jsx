import React from "react";
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link as MuiLink, 
  IconButton, 
  Divider,
  Paper,
  Tooltip,
  Chip
} from "@mui/material";
import { Link } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DevicesIcon from '@mui/icons-material/Devices';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import HomeIcon from '@mui/icons-material/Home';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Enlaces de navegación
  const navLinks = [
    { title: "Inicio", path: "/", icon: <HomeIcon fontSize="small" /> },
    { title: "Dispositivos", path: "/products", icon: <DevicesIcon fontSize="small" /> },
    { title: "Informes", path: "/dashboard", icon: <DashboardIcon fontSize="small" /> },
    { title: "Sobre Nosotros", path: "/about", icon: <InfoIcon fontSize="small" /> },
    { title: "Contacto", path: "/contact", icon: <ContactSupportIcon fontSize="small" /> },
  ];

  // Características principales
  const features = [
    "Gestión de dispositivos IoT",
    "Monitorización en tiempo real",
    "Análisis de datos avanzado",
    "Informes personalizados",
    "Interfaz intuitiva",
    "Soporte multiplataforma"
  ];

  // Redes sociales
  const socialLinks = [
    { icon: <LinkedInIcon />, name: "LinkedIn", url: "https://linkedin.com" },
    { icon: <GitHubIcon />, name: "GitHub", url: "https://github.com" },
    { icon: <TwitterIcon />, name: "Twitter", url: "https://twitter.com" },
    { icon: <FacebookIcon />, name: "Facebook", url: "https://facebook.com" },
    { icon: <InstagramIcon />, name: "Instagram", url: "https://instagram.com" },
  ];

  return (
    <Box component="footer" sx={{ 
      bgcolor: "#0f172a", 
      color: "white",
      position: "relative",
      overflow: "hidden",
      pt: 8,
      pb: 4
    }}>
      {/* Elementos decorativos */}
      <Box 
        sx={{ 
          position: "absolute", 
          top: -100, 
          right: -100, 
          width: 300, 
          height: 300, 
          borderRadius: "50%", 
          background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, rgba(59,130,246,0) 70%)",
          zIndex: 0
        }} 
      />
      <Box 
        sx={{ 
          position: "absolute", 
          bottom: -50, 
          left: -50, 
          width: 200, 
          height: 200, 
          borderRadius: "50%", 
          background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, rgba(139,92,246,0) 70%)",
          zIndex: 0
        }} 
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Logo y descripción */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="h5" 
                component={Link} 
                to="/" 
                sx={{ 
                  color: "white", 
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold"
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    color: "#3b82f6", 
                    mr: 1,
                    background: "linear-gradient(90deg, #3b82f6 0%, #8b5cf6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  Tech
                </Box>
                Hub
              </Typography>
              <Typography variant="body2" sx={{ mt: 2, color: "rgba(255,255,255,0.7)" }}>
                Plataforma líder en gestión y monitorización de dispositivos IoT para empresas y particulares.
              </Typography>
            </Box>

            {/* Características principales */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 2, color: "white", fontWeight: "bold" }}>
                Características
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {features.map((feature, index) => (
                  <Chip
                    key={index}
                    label={feature}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(59,130,246,0.1)',
                      color: 'rgba(255,255,255,0.8)',
                      border: '1px solid rgba(59,130,246,0.3)',
                      mb: 1
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Contacto */}
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 2, color: "white", fontWeight: "bold" }}>
                Contacto
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <EmailIcon sx={{ fontSize: 18, mr: 1, color: "#3b82f6" }} />
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  info@techhub.com
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PhoneIcon sx={{ fontSize: 18, mr: 1, color: "#3b82f6" }} />
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  +34 911 234 567
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                <LocationOnIcon sx={{ fontSize: 18, mr: 1, mt: 0.5, color: "#3b82f6" }} />
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  Calle Gran Vía 28, 6ª Planta<br />
                  28013 Madrid, España
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Enlaces */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {/* Navegación */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" sx={{ mb: 2, color: "white", fontWeight: "bold" }}>
                  Navegación
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {navLinks.map((link, index) => (
                    <Chip
                      key={index}
                      icon={link.icon}
                      label={link.title}
                      component={Link}
                      to={link.path}
                      clickable
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.05)',
                        color: 'rgba(255,255,255,0.8)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        mb: 1,
                        '&:hover': {
                          bgcolor: 'rgba(59,130,246,0.2)',
                          borderColor: 'rgba(59,130,246,0.5)',
                        }
                      }}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Redes Sociales */}
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle2" sx={{ mb: 2, color: "white", fontWeight: "bold" }}>
                  Síguenos
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {socialLinks.map((social, index) => (
                    <Tooltip key={index} title={social.name} arrow>
                      <IconButton 
                        href={social.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          color: "white",
                          bgcolor: "rgba(255,255,255,0.05)",
                          '&:hover': {
                            bgcolor: "rgba(59,130,246,0.2)",
                          }
                        }}
                        size="small"
                      >
                        {social.icon}
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </Grid>

              {/* Newsletter */}
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Paper 
                  sx={{ 
                    p: 3, 
                    bgcolor: "rgba(255,255,255,0.05)", 
                    borderRadius: 2,
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: "white", mb: 1 }}>
                    Plataforma TechHub
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mb: 2 }}>
                    Gestiona tus dispositivos IoT de forma eficiente con nuestra plataforma intuitiva y potente. Monitoriza, analiza y optimiza tu red de dispositivos conectados desde cualquier lugar.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />
        
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "center", sm: "flex-start" } }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", textAlign: { xs: "center", sm: "left" } }}>
            {currentYear} TechHub. Todos los derechos reservados.
          </Typography>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mt: { xs: 1, sm: 0 }, textAlign: { xs: "center", sm: "right" } }}>
            Diseñado con ❤️ para una mejor experiencia IoT
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
