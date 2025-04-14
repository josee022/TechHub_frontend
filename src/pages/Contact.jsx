import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Divider,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  useTheme,
  InputAdornment,
  Tooltip,
  Zoom
} from '@mui/material';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import { motion } from 'framer-motion';

// Iconos
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import MessageIcon from '@mui/icons-material/Message';
import BusinessIcon from '@mui/icons-material/Business';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import SupportIcon from '@mui/icons-material/Support';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import HandshakeIcon from '@mui/icons-material/Handshake';

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

const ContactPage = () => {
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

  // Información de contacto
  const contactInfo = [
    {
      icon: <EmailIcon fontSize="large" sx={{ color: '#3b82f6' }} />,
      title: "Email",
      content: "info@techhub.com",
      action: "mailto:info@techhub.com"
    },
    {
      icon: <PhoneIcon fontSize="large" sx={{ color: '#8b5cf6' }} />,
      title: "Teléfono",
      content: "+34 912 345 678",
      action: "tel:+34912345678"
    },
    {
      icon: <LocationOnIcon fontSize="large" sx={{ color: '#3b82f6' }} />,
      title: "Dirección",
      content: "Calle Gran Vía 123, 28013 Madrid, España",
      action: "https://maps.google.com/?q=Gran+Via+123+Madrid+España"
    },
    {
      icon: <WhatsAppIcon fontSize="large" sx={{ color: '#8b5cf6' }} />,
      title: "WhatsApp",
      content: "+34 612 345 678",
      action: "https://wa.me/34612345678"
    }
  ];

  // Redes sociales
  const socialLinks = [
    { icon: <LinkedInIcon />, name: "LinkedIn", url: "https://linkedin.com", color: "#0077B5" },
    { icon: <TwitterIcon />, name: "Twitter", url: "https://twitter.com", color: "#1DA1F2" },
    { icon: <FacebookIcon />, name: "Facebook", url: "https://facebook.com", color: "#4267B2" },
    { icon: <InstagramIcon />, name: "Instagram", url: "https://instagram.com", color: "#E1306C" }
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
              Contacto
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
              Estamos aquí para ayudarte. Contáctanos para resolver tus dudas o solicitar información sobre nuestros servicios.
            </Typography>
          </motion.div>
        </Container>
      </Box>
      
      {/* Contenido principal */}
      <Container maxWidth="lg" sx={{ mb: 10, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Información de contacto */}
          <Grid item xs={12} md={5} lg={4}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Box sx={{ mb: 4 }}>
                <Typography 
                  variant="h4" 
                  component="h2" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 4, 
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  Información de Contacto
                </Typography>
                
                <Grid container spacing={3}>
                  {contactInfo.map((item, index) => (
                    <Grid item xs={12} key={index}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <Card 
                          sx={{ 
                            borderRadius: 3,
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                              transform: 'translateY(-5px)',
                              boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
                            }
                          }}
                        >
                          <CardContent sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
                            <Box 
                              sx={{ 
                                mr: 3,
                                p: 1.5,
                                borderRadius: '50%',
                                background: 'rgba(59, 130, 246, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {item.icon}
                            </Box>
                            <Box>
                              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                                {item.title}
                              </Typography>
                              <Typography 
                                variant="body1" 
                                component="a" 
                                href={item.action}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{ 
                                  color: 'text.secondary',
                                  textDecoration: 'none',
                                  '&:hover': {
                                    color: '#3b82f6',
                                    textDecoration: 'underline'
                                  }
                                }}
                              >
                                {item.content}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              
              <Box sx={{ mt: 6 }}>
                <Typography 
                  variant="h5" 
                  component="h3" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 3, 
                    color: 'white',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                >
                  Síguenos en Redes Sociales
                </Typography>
                
                <Card 
                  sx={{ 
                    p: 3,
                    borderRadius: 3,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
                    {socialLinks.map((social, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Tooltip title={social.name} TransitionComponent={Zoom}>
                          <IconButton 
                            href={social.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ 
                              color: 'white',
                              bgcolor: social.color,
                              '&:hover': {
                                bgcolor: social.color,
                                transform: 'scale(1.1)',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                              },
                              transition: 'transform 0.3s, box-shadow 0.3s'
                            }}
                          >
                            {social.icon}
                          </IconButton>
                        </Tooltip>
                      </motion.div>
                    ))}
                  </Box>
                </Card>
              </Box>
            </motion.div>
          </Grid>
          
          {/* Horarios y Oficinas */}
          <Grid item xs={12} md={7} lg={8}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card 
                sx={{ 
                  p: 4,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                  mb: 4
                }}
              >
                <Typography variant="h4" component="h2" sx={{ mb: 1, fontWeight: 700, color: '#1a237e' }}>
                  Horarios de Atención
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Nuestro equipo está disponible para atenderte en los siguientes horarios:
                </Typography>
                
                <Grid container spacing={3} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 2, bgcolor: 'rgba(59, 130, 246, 0.05)', borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#1a237e' }}>
                        Soporte Técnico
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight={500}>Lunes a Viernes:</Typography>
                        <Typography variant="body2">8:00 - 20:00</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight={500}>Sábados:</Typography>
                        <Typography variant="body2">9:00 - 14:00</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" fontWeight={500}>Domingos:</Typography>
                        <Typography variant="body2">Cerrado</Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body2" color="text.secondary">
                        <InfoIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        Clientes Premium disponen de soporte 24/7
                      </Typography>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Card sx={{ p: 2, bgcolor: 'rgba(139, 92, 246, 0.05)', borderRadius: 2 }}>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#1a237e' }}>
                        Atención Comercial
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight={500}>Lunes a Viernes:</Typography>
                        <Typography variant="body2">9:00 - 18:00</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" fontWeight={500}>Sábados:</Typography>
                        <Typography variant="body2">Cerrado</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" fontWeight={500}>Domingos:</Typography>
                        <Typography variant="body2">Cerrado</Typography>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body2" color="text.secondary">
                        <InfoIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                        Consultas comerciales en info@techhub.com
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
                
                <Typography variant="h5" component="h3" sx={{ mt: 4, mb: 3, fontWeight: 600, color: '#1a237e' }}>
                  Nuestras Oficinas
                </Typography>
                
                <Grid container spacing={3}>
                  {[
                    {
                      city: "Madrid",
                      address: "Calle Gran Vía 123, 28013 Madrid",
                      phone: "+34 912 345 678",
                      email: "madrid@techhub.com"
                    },
                    {
                      city: "Barcelona",
                      address: "Avinguda Diagonal 456, 08006 Barcelona",
                      phone: "+34 932 345 678",
                      email: "barcelona@techhub.com"
                    },
                    {
                      city: "Lisboa",
                      address: "Avenida da Liberdade 789, 1250-096 Lisboa",
                      phone: "+351 212 345 678",
                      email: "lisboa@techhub.com"
                    },
                    {
                      city: "París",
                      address: "Avenue des Champs-Élysées 101, 75008 Paris",
                      phone: "+33 112 345 678",
                      email: "paris@techhub.com"
                    }
                  ].map((office, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Card 
                        sx={{ 
                          p: 2, 
                          height: '100%',
                          borderRadius: 2,
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                          }
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {office.city}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          {office.address}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <PhoneIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography variant="body2">
                            {office.phone}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <EmailIcon fontSize="small" color="action" sx={{ mr: 1 }} />
                          <Typography 
                            variant="body2" 
                            component="a"
                            href={`mailto:${office.email}`}
                            sx={{ 
                              color: '#3b82f6',
                              textDecoration: 'none',
                              fontWeight: 500,
                              '&:hover': { textDecoration: 'underline' }
                            }}
                          >
                            {office.email}
                          </Typography>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Card>
              
              <Card 
                sx={{ 
                  p: 4,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
                }}
              >
                <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 700, color: '#1a237e' }}>
                  Canales de Atención
                </Typography>
                
                <Grid container spacing={3}>
                  {[
                    {
                      title: "Soporte Técnico",
                      description: "Asistencia para problemas técnicos, configuración y uso de la plataforma.",
                      icon: <SupportIcon fontSize="large" sx={{ color: '#3b82f6' }} />,
                      contact: "soporte@techhub.com"
                    },
                    {
                      title: "Ventas",
                      description: "Información sobre planes, precios y soluciones personalizadas.",
                      icon: <ShoppingCartIcon fontSize="large" sx={{ color: '#8b5cf6' }} />,
                      contact: "ventas@techhub.com"
                    },
                    {
                      title: "Atención al Cliente",
                      description: "Consultas generales, facturación y gestión de cuenta.",
                      icon: <ContactPhoneIcon fontSize="large" sx={{ color: '#3b82f6' }} />,
                      contact: "clientes@techhub.com"
                    },
                    {
                      title: "Alianzas Estratégicas",
                      description: "Oportunidades de colaboración y partnerships.",
                      icon: <HandshakeIcon fontSize="large" sx={{ color: '#8b5cf6' }} />,
                      contact: "alianzas@techhub.com"
                    }
                  ].map((channel, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', height: '100%' }}>
                        <Box 
                          sx={{ 
                            mr: 2,
                            p: 1.5,
                            height: 'fit-content',
                            borderRadius: '50%',
                            background: 'rgba(59, 130, 246, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {channel.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                            {channel.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {channel.description}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            component="a"
                            href={`mailto:${channel.contact}`}
                            sx={{ 
                              color: '#3b82f6',
                              textDecoration: 'none',
                              fontWeight: 500,
                              '&:hover': { textDecoration: 'underline' }
                            }}
                          >
                            {channel.contact}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
      
      {/* Mapa */}
      <Box sx={{ mb: 10 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card 
              sx={{ 
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" sx={{ mb: 1, fontWeight: 600, color: '#1a237e' }}>
                  Nuestra Ubicación
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Visítanos en nuestras oficinas centrales en Madrid
                </Typography>
              </Box>
              <Box sx={{ height: 400, width: '100%', position: 'relative' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.6510520590373!2d-3.7037974846361847!3d40.41957937936409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd422886b1e73767%3A0x3e1c58ed12e6edc!2sGran%20V%C3%ADa%2C%20Madrid!5e0!3m2!1ses!2ses!4v1650000000000!5m2!1ses!2ses" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de TechHub"
                />
              </Box>
            </Card>
          </motion.div>
        </Container>
      </Box>
      
      {/* FAQ */}
      <Box sx={{ py: 8, mb: 10, background: 'rgba(15, 23, 42, 0.3)' }}>
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
              Preguntas Frecuentes
            </Typography>
          </motion.div>
          
          <Grid container spacing={3}>
            {[
              {
                question: "¿Cuál es el tiempo de respuesta a las consultas?",
                answer: "Nos comprometemos a responder todas las consultas en un plazo máximo de 24 horas laborables."
              },
              {
                question: "¿Ofrecen soporte técnico 24/7?",
                answer: "Sí, nuestro equipo de soporte técnico está disponible 24/7 para clientes con plan Premium."
              },
              {
                question: "¿Cómo puedo solicitar una demo de la plataforma?",
                answer: "Puedes solicitar una demo a través del formulario de contacto o llamando directamente a nuestro teléfono de atención al cliente."
              },
              {
                question: "¿Tienen oficinas en otras ciudades?",
                answer: "Actualmente contamos con oficinas en Madrid, Barcelona, Lisboa y París. Próximamente abriremos en Berlín y Ámsterdam."
              }
            ].map((faq, index) => (
              <Grid item xs={12} md={6} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card 
                    sx={{ 
                      p: 3,
                      height: '100%',
                      borderRadius: 3,
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Typography variant="h6" component="h3" sx={{ mb: 2, fontWeight: 600, color: '#1a237e' }}>
                      {faq.question}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {faq.answer}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
