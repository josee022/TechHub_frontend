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
  Tooltip
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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Enlaces de navegación
  const navLinks = [
    { title: "Inicio", path: "/" },
    { title: "Dispositivos", path: "/products" },
    { title: "Informes", path: "/dashboard" },
    { title: "Sobre Nosotros", path: "/about" },
    { title: "Contacto", path: "/contact" },
  ];

  // Enlaces de recursos
  const resourceLinks = [
    { title: "Documentación API", path: "/docs/api" },
    { title: "Guías de Usuario", path: "/docs/guides" },
    { title: "Preguntas Frecuentes", path: "/faq" },
    { title: "Soporte Técnico", path: "/support" },
  ];

  // Enlaces legales
  const legalLinks = [
    { title: "Términos de Servicio", path: "/terms" },
    { title: "Política de Privacidad", path: "/privacy" },
    { title: "Cookies", path: "/cookies" },
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
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '0.3rem',
                    mr: 1,
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                  }}
                >
                  TH
                </Box>
                TechHub
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mb: 3, maxWidth: 300 }}>
              Plataforma líder en gestión de dispositivos IoT. Ofrecemos soluciones integrales para monitorear y optimizar tu ecosistema de dispositivos conectados.
            </Typography>
            
            {/* Información de contacto */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, color: "white", fontWeight: "bold" }}>
                Contacto
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <EmailIcon fontSize="small" sx={{ mr: 1, color: "#3b82f6" }} />
                <MuiLink href="mailto:info@techhub.com" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  info@techhub.com
                </MuiLink>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PhoneIcon fontSize="small" sx={{ mr: 1, color: "#3b82f6" }} />
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  +34 912 345 678
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                <LocationOnIcon fontSize="small" sx={{ mr: 1, color: "#3b82f6", mt: 0.5 }} />
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  Calle Gran Vía 123<br />
                  28013 Madrid, España
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Enlaces */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {/* Navegación */}
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle2" sx={{ mb: 2, color: "white", fontWeight: "bold" }}>
                  Navegación
                </Typography>
                <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                  {navLinks.map((link, index) => (
                    <Box component="li" key={index} sx={{ mb: 1 }}>
                      <MuiLink 
                        component={Link} 
                        to={link.path} 
                        sx={{ 
                          color: "rgba(255,255,255,0.7)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                          "&:hover": {
                            color: "#3b82f6",
                          }
                        }}
                      >
                        {link.title}
                      </MuiLink>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Recursos */}
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle2" sx={{ mb: 2, color: "white", fontWeight: "bold" }}>
                  Recursos
                </Typography>
                <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                  {resourceLinks.map((link, index) => (
                    <Box component="li" key={index} sx={{ mb: 1 }}>
                      <MuiLink 
                        component={Link} 
                        to={link.path} 
                        sx={{ 
                          color: "rgba(255,255,255,0.7)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                          "&:hover": {
                            color: "#3b82f6",
                          }
                        }}
                      >
                        {link.title}
                      </MuiLink>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Legal */}
              <Grid item xs={6} sm={4}>
                <Typography variant="subtitle2" sx={{ mb: 2, color: "white", fontWeight: "bold" }}>
                  Legal
                </Typography>
                <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                  {legalLinks.map((link, index) => (
                    <Box component="li" key={index} sx={{ mb: 1 }}>
                      <MuiLink 
                        component={Link} 
                        to={link.path} 
                        sx={{ 
                          color: "rgba(255,255,255,0.7)",
                          textDecoration: "none",
                          transition: "color 0.2s",
                          "&:hover": {
                            color: "#3b82f6",
                          }
                        }}
                      >
                        {link.title}
                      </MuiLink>
                    </Box>
                  ))}
                </Box>
              </Grid>

              {/* Newsletter */}
              <Grid item xs={12} sm={8} sx={{ mt: 3 }}>
                <Paper 
                  sx={{ 
                    p: 3, 
                    bgcolor: "rgba(255,255,255,0.05)", 
                    borderRadius: 2,
                    border: "1px solid rgba(255,255,255,0.1)"
                  }}
                >
                  <Typography variant="subtitle1" sx={{ color: "white", mb: 1 }}>
                    ¿Quieres estar al día?
                  </Typography>
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mb: 2 }}>
                    Suscríbete a nuestro newsletter para recibir actualizaciones y novedades.
                  </Typography>
                  <Box 
                    component="a" 
                    href="/newsletter" 
                    sx={{ 
                      display: "inline-block",
                      color: "white",
                      bgcolor: "#3b82f6",
                      px: 3,
                      py: 1,
                      borderRadius: 1,
                      textDecoration: "none",
                      fontWeight: "medium",
                      transition: "all 0.2s",
                      "&:hover": {
                        bgcolor: "#2563eb",
                        transform: "translateY(-2px)"
                      }
                    }}
                  >
                    Suscribirse
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Pie de página con copyright y redes sociales */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, justifyContent: "space-between", alignItems: { xs: "center", sm: "center" } }}>
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mb: { xs: 2, sm: 0 } }}>
            &copy; {currentYear} TechHub. Todos los derechos reservados.
          </Typography>
          
          <Box sx={{ display: "flex", gap: 1 }}>
            {socialLinks.map((social, index) => (
              <Tooltip key={index} title={social.name}>
                <IconButton 
                  component="a" 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ 
                    color: "rgba(255,255,255,0.6)",
                    transition: "all 0.2s",
                    "&:hover": {
                      color: "#3b82f6",
                      transform: "translateY(-2px)"
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
