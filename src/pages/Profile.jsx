import React, { useEffect, useState } from "react";
import { getUserProfile } from "../service/api";
import { Typography, Container, Paper, Button, Box, Grid, Avatar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
}));

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getUserProfile();
        console.log("Profile Data:", response);
        setUserData(response);
      } catch (error) {
        console.error("Error al cargar los datos del perfil", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!userData) return <div>No tienes permisos o no estás logueado</div>;

  return (
    <>
      <Header />
      <Box sx={{
        minHeight: 'calc(100vh - 160px)',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
        padding: '2rem 0',
      }}>
        <Container maxWidth="lg">
          <StyledPaper>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={userData.avatar_url || undefined}
                    sx={{
                      width: 150,
                      height: 150,
                      margin: '1rem auto',
                      border: '4px solid #fff',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                  <Typography variant="h4" gutterBottom sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                    {userData.user?.username}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                  <Typography variant="h6" sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                    Información Personal
                  </Typography>
                  <Box sx={{ 
                    p: 2, 
                    bgcolor: 'rgba(17, 39, 119, 0.1)', 
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Typography variant="body1" sx={{ color: '#1a237e', fontWeight: '500' }}>
                      <strong sx={{ color: '#1a237e', fontWeight: '600' }}>Correo:</strong> {userData.user?.email}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#1a237e', fontWeight: '500' }}>
                      <strong sx={{ color: '#1a237e', fontWeight: '600' }}>Ubicación:</strong> {userData.location || "No especificada"}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#1a237e', fontWeight: '500' }}>
                      <strong sx={{ color: '#1a237e', fontWeight: '600' }}>Biografía:</strong> {userData.bio || "No hay biografía"}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      onClick={() => navigate("/edit-profile")} 
                      variant="contained" 
                      sx={{
                        bgcolor: '#1a237e',
                        color: '#fff',
                        '&:hover': {
                          bgcolor: '#0d47a1',
                        },
                      }}
                    >
                      Editar Perfil
                    </Button>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </StyledPaper>

          {/* Sección adicional sobre TechHub */}
          <Box sx={{ 
            bgcolor: '#fff', 
            borderRadius: '16px',
            mt: 4,
            p: 4,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateY(-2px)',
            }
          }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ 
                  bgcolor: 'rgba(17, 39, 119, 0.1)', 
                  p: 3,
                  borderRadius: '8px',
                  height: '100%'
                }}>
                  <Typography variant="h5" sx={{ 
                    color: '#1a237e', 
                    fontWeight: 'bold', 
                    mb: 3,
                    textAlign: 'center'
                  }}>
                    Nuestros Valores
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="body1" sx={{ 
                      color: '#1a237e', 
                      fontWeight: '500'
                    }}>
                      <strong sx={{ color: '#1a237e', fontWeight: '600' }}>Innovación:</strong>
                      <br />
                      Promovemos la innovación continua en el desarrollo tecnológico.
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#1a237e', 
                      fontWeight: '500'
                    }}>
                      <strong sx={{ color: '#1a237e', fontWeight: '600' }}>Colaboración:</strong>
                      <br />
                      Fomentamos el trabajo en equipo y el intercambio de conocimientos.
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#1a237e', 
                      fontWeight: '500'
                    }}>
                      <strong sx={{ color: '#1a237e', fontWeight: '600' }}>Excelencia:</strong>
                      <br />
                      Buscamos la excelencia en todos nuestros proyectos y servicios.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ 
                  bgcolor: 'rgba(17, 39, 119, 0.1)', 
                  p: 3,
                  borderRadius: '8px',
                  height: '100%'
                }}>
                  <Typography variant="h5" sx={{ 
                    color: '#1a237e', 
                    fontWeight: 'bold', 
                    mb: 3,
                    textAlign: 'center'
                  }}>
                    Tecnologías Destacadas
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="body1" sx={{ 
                      color: '#1a237e', 
                      fontWeight: '500'
                    }}>
                      <strong sx={{ color: '#1a237e', fontWeight: '600' }}>Desarrollo Web:</strong>
                      <br />
                      React, Node.js, Python, Django
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#1a237e', 
                      fontWeight: '500'
                    }}>
                      <strong sx={{ color: '#1a237e', fontWeight: '600' }}>Desarrollo Móvil:</strong>
                      <br />
                      React Native, Flutter
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#1a237e', 
                      fontWeight: '500'
                    }}>
                      <strong sx={{ color: '#1a237e', fontWeight: '600' }}>Cloud Computing:</strong>
                      <br />
                      AWS, Azure, Google Cloud
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ 
                  bgcolor: 'rgba(17, 39, 119, 0.1)', 
                  p: 3,
                  borderRadius: '8px',
                  height: '100%'
                }}>
                  <Typography variant="h5" sx={{ 
                    color: '#1a237e', 
                    fontWeight: 'bold', 
                    mb: 3,
                    textAlign: 'center'
                  }}>
                    Nuestros Servicios
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="body1" sx={{ 
                      color: '#1a237e', 
                      fontWeight: '500'
                    }}>
                      <strong sx={{ color: '#1a237e', fontWeight: '600' }}>Desarrollo Personalizado:</strong>
                      <br />
                      Soluciones a medida para tus necesidades.
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#1a237e', 
                      fontWeight: '500'
                    }}>
                      <strong sx={{ color: '#1a237e', fontWeight: '600' }}>Consultoría Técnica:</strong>
                      <br />
                      Asesoramiento experto en tecnologías emergentes.
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      color: '#1a237e', 
                      fontWeight: '500'
                    }}>
                      <strong sx={{ color: '#1a237e', fontWeight: '600' }}>Formación:</strong>
                      <br />
                      Cursos y talleres de última generación.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default ProfilePage;
