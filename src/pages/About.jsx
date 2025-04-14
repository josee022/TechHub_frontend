import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Divider,
  Chip,
  Button,
  IconButton,
  Tooltip,
  Paper,
  Fade,
  Zoom,
  useTheme
} from '@mui/material';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import { motion } from 'framer-motion';

// Iconos
import CodeIcon from '@mui/icons-material/Code';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import SupportIcon from '@mui/icons-material/Support';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import VerifiedIcon from '@mui/icons-material/Verified';
import HistoryIcon from '@mui/icons-material/History';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import GroupsIcon from '@mui/icons-material/Groups';

// Animaciones
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

const AboutPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Comprobar si el usuario está logueado
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  // Datos del equipo
  const teamMembers = [
    {
      name: "Ana García",
      role: "CEO & Fundadora",
      bio: "Visionaria tecnológica con más de 15 años de experiencia en el sector IoT. Anteriormente lideró proyectos en Google y Microsoft para gestión de dispositivos IoT.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      }
    },
    {
      name: "Carlos Rodríguez",
      role: "CTO",
      bio: "Ingeniero de software sobre arquitecturas IoT escalables. Contribución en varios proyectos sobre conectividad de dispositivos.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      }
    },
    {
      name: "Elena Martínez",
      role: "Directora de Producto",
      bio: "Especialista en UX/UI con enfoque en crear experiencias intuitivas para gestión de dispositivos IoT. Anteriormente trabajó en Amazon y Tesla.",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      }
    },
    {
      name: "David López",
      role: "Lead Developer",
      bio: "Desarrollador full-stack con experiencia en React, Django y sistemas embebidos. Apasionado por la optimización de rendimiento y la seguridad.",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        github: "https://github.com"
      }
    }
  ];

  // Valores de la empresa
  const companyValues = [
    {
      title: "Innovación",
      description: "Constantemente buscamos nuevas formas de mejorar la gestión de dispositivos IoT.",
      icon: <EmojiObjectsIcon fontSize="large" sx={{ color: '#3b82f6' }} />
    },
    {
      title: "Seguridad",
      description: "La protección de los datos y dispositivos de nuestros clientes es nuestra máxima prioridad.",
      icon: <SecurityIcon fontSize="large" sx={{ color: '#8b5cf6' }} />
    },
    {
      title: "Rendimiento",
      description: "Nos esforzamos por ofrecer soluciones rápidas y eficientes que optimicen los recursos.",
      icon: <SpeedIcon fontSize="large" sx={{ color: '#3b82f6' }} />
    },
    {
      title: "Soporte",
      description: "Ofrecemos asistencia personalizada y continua para garantizar el éxito de nuestros clientes.",
      icon: <SupportIcon fontSize="large" sx={{ color: '#8b5cf6' }} />
    }
  ];

  // Historia de la empresa
  const companyHistory = [
    {
      year: "2018",
      title: "Fundación",
      description: "TechHub nace como una startup enfocada en soluciones IoT para empresas pequeñas y medianas."
    },
    {
      year: "2019",
      title: "Primera versión",
      description: "Lanzamiento de la primera versión de nuestra plataforma de gestión de dispositivos IoT."
    },
    {
      year: "2020",
      title: "Expansión",
      description: "Ampliamos nuestro equipo y abrimos oficinas en Madrid y Barcelona."
    },
    {
      year: "2021",
      title: "Reconocimiento",
      description: "Ganamos el premio a la Mejor Solución IoT en los European Technology Awards."
    },
    {
      year: "2022",
      title: "Internacionalización",
      description: "Expandimos nuestras operaciones a Portugal, Francia y Alemania."
    },
    {
      year: "2023",
      title: "Innovación",
      description: "Lanzamiento de TechHub 2.0 con inteligencia artificial y análisis predictivo."
    }
  ];

  if (!isLoggedIn) {
    return null; // No renderizar nada mientras se redirige
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      <Header />
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          position: 'relative',
          py: 12,
          overflow: 'hidden',
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
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h2" 
              component="h1" 
              align="center" 
              sx={{ 
                fontWeight: 800, 
                mb: 2, 
                color: 'white',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              Sobre Nosotros
            </Typography>
            
            <Typography 
              variant="h5" 
              align="center" 
              sx={{ 
                mb: 6, 
                color: 'rgba(255,255,255,0.8)',
                maxWidth: 800,
                mx: 'auto'
              }}
            >
              Transformando la gestión de dispositivos IoT con soluciones innovadoras y seguras para empresas de todos los tamaños.
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card 
              sx={{ 
                borderRadius: 4, 
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                mb: 8
              }}
            >
              <Grid container>
                <Grid item xs={12} md={6}>
                  <CardMedia
                    component="img"
                    image="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
                    alt="Equipo de TechHub"
                    sx={{ height: '100%', minHeight: 400 }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardContent sx={{ p: 6 }}>
                    <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 700, color: '#1a237e' }}>
                      Nuestra Misión
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem' }}>
                      En TechHub, nuestra misión es simplificar la gestión de dispositivos IoT para empresas de todos los tamaños, proporcionando una plataforma intuitiva, segura y escalable que permita a nuestros clientes maximizar el valor de sus inversiones en tecnología conectada.
                    </Typography>
                    <Typography variant="h5" component="h3" sx={{ mb: 2, fontWeight: 600, color: '#1a237e' }}>
                      ¿Por qué elegirnos?
                    </Typography>
                    <Grid container spacing={2} sx={{ mb: 3 }}>
                      {['Experiencia', 'Innovación', 'Seguridad', 'Soporte 24/7'].map((item, index) => (
                        <Grid item xs={6} key={index}>
                          <Chip 
                            icon={<VerifiedIcon />} 
                            label={item} 
                            sx={{ 
                              px: 1, 
                              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                              color: 'white',
                              '& .MuiChip-icon': { color: 'white' }
                            }} 
                          />
                        </Grid>
                      ))}
                    </Grid>
                    <Button 
                      variant="contained" 
                      size="large"
                      sx={{ 
                        mt: 2,
                        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                        borderRadius: '8px',
                        px: 4,
                        '&:hover': {
                          background: 'linear-gradient(90deg, #2563eb, #7c3aed)'
                        }
                      }}
                    >
                      Conoce nuestras soluciones
                    </Button>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </motion.div>
        </Container>
      </Box>
      
      {/* Valores de la empresa */}
      <Box sx={{ py: 10, position: 'relative' }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              sx={{ 
                fontWeight: 700, 
                mb: 6, 
                color: 'white',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)'
              }}
            >
              Nuestros Valores
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            {companyValues.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      p: 4,
                      borderRadius: 4,
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    <Box 
                      sx={{ 
                        mb: 3,
                        p: 2,
                        borderRadius: '50%',
                        background: 'rgba(59, 130, 246, 0.1)'
                      }}
                    >
                      {value.icon}
                    </Box>
                    <Typography variant="h5" component="h3" align="center" sx={{ mb: 2, fontWeight: 600 }}>
                      {value.title}
                    </Typography>
                    <Typography variant="body1" align="center" color="text.secondary">
                      {value.description}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Historia de la empresa */}
      <Box 
        sx={{ 
          py: 10, 
          background: 'rgba(15, 23, 42, 0.3)',
          position: 'relative'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 6 }}>
              <HistoryIcon sx={{ fontSize: 40, color: 'white', mr: 2 }} />
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  color: 'white',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}
              >
                Nuestra Historia
              </Typography>
            </Box>
          </motion.div>
          
          <Box sx={{ position: 'relative' }}>
            {/* Línea vertical */}
            <Box 
              sx={{ 
                position: 'absolute',
                left: { xs: 20, md: '50%' },
                top: 0,
                bottom: 0,
                width: 4,
                ml: { xs: 0, md: -2 },
                backgroundColor: 'rgba(255,255,255,0.2)',
                zIndex: 0
              }}
            />
            
            {/* Eventos históricos */}
            {companyHistory.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box 
                  sx={{ 
                    display: 'flex',
                    flexDirection: { xs: 'column', md: index % 2 === 0 ? 'row' : 'row-reverse' },
                    mb: 5,
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {/* Punto en la línea */}
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      left: { xs: 20, md: '50%' },
                      top: 30,
                      width: 20,
                      height: 20,
                      ml: { xs: -8, md: -10 },
                      borderRadius: '50%',
                      backgroundColor: '#3b82f6',
                      border: '4px solid white',
                      boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.3)',
                      zIndex: 2
                    }}
                  />
                  
                  {/* Año */}
                  <Box 
                    sx={{ 
                      width: { xs: '100%', md: '50%' },
                      pr: { xs: 0, md: index % 2 === 0 ? 4 : 0 },
                      pl: { xs: 0, md: index % 2 === 0 ? 0 : 4 },
                      textAlign: { xs: 'left', md: index % 2 === 0 ? 'right' : 'left' },
                      mb: { xs: 2, md: 0 },
                      ml: { xs: 8, md: 0 }
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      component="span" 
                      sx={{ 
                        fontWeight: 700, 
                        color: 'white',
                        display: 'inline-block',
                        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                        px: 2,
                        py: 0.5,
                        borderRadius: 2
                      }}
                    >
                      {event.year}
                    </Typography>
                  </Box>
                  
                  {/* Contenido */}
                  <Box 
                    sx={{ 
                      width: { xs: '100%', md: '50%' },
                      pl: { xs: 8, md: index % 2 === 0 ? 4 : 0 },
                      pr: { xs: 0, md: index % 2 === 0 ? 0 : 4 },
                    }}
                  >
                    <Paper 
                      sx={{ 
                        p: 3,
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
                      }}
                    >
                      <Typography variant="h5" component="h3" sx={{ mb: 1, fontWeight: 600, color: '#1a237e' }}>
                        {event.title}
                      </Typography>
                      <Typography variant="body1">
                        {event.description}
                      </Typography>
                    </Paper>
                  </Box>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>
      
      {/* Equipo */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 6 }}>
              <GroupsIcon sx={{ fontSize: 40, color: 'white', mr: 2 }} />
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  color: 'white',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}
              >
                Nuestro Equipo
              </Typography>
            </Box>
            <Typography 
              variant="h6" 
              align="center" 
              sx={{ 
                mb: 8, 
                color: 'rgba(255,255,255,0.8)',
                maxWidth: 800,
                mx: 'auto'
              }}
            >
              Un grupo de profesionales apasionados por la tecnología y comprometidos con la excelencia.
            </Typography>
          </motion.div>
          
          <Grid container spacing={4}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      overflow: 'hidden',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 12px 20px rgba(0,0,0,0.2)'
                      }
                    }}
                  >
                    <Box sx={{ position: 'relative', pt: '100%' }}>
                      <CardMedia
                        component="img"
                        image={member.avatar}
                        alt={member.name}
                        sx={{ 
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                        {member.name}
                      </Typography>
                      <Typography variant="subtitle1" color="primary" sx={{ mb: 2, fontWeight: 500 }}>
                        {member.role}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        {member.bio}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" sx={{ color: '#0077B5' }}>
                          <LinkedInIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#1DA1F2' }}>
                          <TwitterIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ color: '#333' }}>
                          <GitHubIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* CTA */}
      <Box 
        sx={{ 
          py: 8, 
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box 
          sx={{ 
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 0
          }}
        />
        <Box 
          sx={{ 
            position: 'absolute',
            bottom: -50,
            left: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 0
          }}
        />
        
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 3, 
                  color: 'white',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}
              >
                ¿Listo para transformar tu gestión de dispositivos IoT?
              </Typography>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 4, 
                  color: 'rgba(255,255,255,0.9)',
                  maxWidth: 800,
                  mx: 'auto'
                }}
              >
                Únete a cientos de empresas que ya confían en TechHub para optimizar sus operaciones IoT.
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 2, 
                  color: 'rgba(255,255,255,0.9)',
                  maxWidth: 800,
                  mx: 'auto',
                  fontWeight: 500
                }}
              >
                Explora nuestra plataforma y descubre cómo podemos ayudarte a gestionar tus dispositivos IoT de manera eficiente y segura.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  icon={<VerifiedIcon />} 
                  label="Soluciones personalizadas" 
                  sx={{ 
                    px: 2,
                    py: 3,
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '& .MuiChip-icon': { color: 'white' },
                    fontSize: '1rem'
                  }} 
                />
                <Chip 
                  icon={<VerifiedIcon />} 
                  label="Soporte 24/7" 
                  sx={{ 
                    px: 2,
                    py: 3,
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '& .MuiChip-icon': { color: 'white' },
                    fontSize: '1rem'
                  }} 
                />
                <Chip 
                  icon={<VerifiedIcon />} 
                  label="Tecnología de vanguardia" 
                  sx={{ 
                    px: 2,
                    py: 3,
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '& .MuiChip-icon': { color: 'white' },
                    fontSize: '1rem'
                  }} 
                />
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
