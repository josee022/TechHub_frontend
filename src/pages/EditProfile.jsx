import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../service/api";
import { Typography, Container, Paper, TextField, Button, Box, Grid, Stack, Avatar } from "@mui/material";
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

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    user: {
      username: "",
      email: "",
    },
    bio: "",
    location: "",
    avatar: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getUserProfile();
        console.log("Edit Profile Data:", response);

        setFormData({
          user: {
            username: response.user?.username || "",
            email: response.user?.email || "",
          },
          bio: response.bio || "",
          location: response.location || "",
          avatar: response.avatar || null,
        });
      } catch (error) {
        console.error("Error al cargar los datos del perfil", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setFormData({
        ...formData,
        user: {
          ...formData.user,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Enviamos los campos individuales
      formDataToSend.append("username", formData.user.username);
      formDataToSend.append("email", formData.user.email);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("location", formData.location);
      
      // El avatar se envía solo si es un archivo nuevo
      if (formData.avatar instanceof File) {
        formDataToSend.append("avatar", formData.avatar);
      }

      const response = await updateUserProfile(formDataToSend);
      console.log("Respuesta de actualización:", response);
      navigate("/profile");
    } catch (error) {
      console.error("Error al actualizar el perfil", error);
      if (error.response) {
        console.log("Error response:", error.response.data);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <Box sx={{
        minHeight: 'calc(100vh - 160px)',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
        padding: '2rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Container maxWidth="md" sx={{ width: '100%' }}>
          <StyledPaper>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={formData.avatar ? (formData.avatar instanceof File 
                      ? URL.createObjectURL(formData.avatar)
                      : `http://localhost:8000${formData.avatar}`
                    ) : undefined}
                    sx={{
                      width: 150,
                      height: 150,
                      margin: '1rem auto',
                      border: '4px solid #fff',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    }}
                  />
                  <Typography variant="h4" gutterBottom sx={{ color: '#1a237e', fontWeight: 'bold' }}>
                    {formData.user?.username}
                  </Typography>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    id="avatar-upload"
                  />
                  <label htmlFor="avatar-upload">
                    <Button
                      variant="contained"
                      component="span"
                      sx={{
                        bgcolor: '#1a237e',
                        color: '#fff',
                        '&:hover': {
                          bgcolor: '#0d47a1',
                        },
                        marginTop: '1rem',
                      }}
                    >
                      Cambiar foto
                    </Button>
                  </label>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <form onSubmit={handleSubmit}>
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
                        <strong sx={{ color: '#1a237e', fontWeight: '600' }}>Correo:</strong> {formData.user?.email}
                      </Typography>
                    </Box>
                    <TextField
                      fullWidth
                      label="Nombre de Usuario"
                      name="username"
                      value={formData.user.username}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ 
                        bgcolor: 'rgba(17, 39, 119, 0.1)', 
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&:hover fieldset': {
                            borderColor: '#fff',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#fff',
                          },
                        },
                        '& label': {
                          color: '#1a237e',
                        },
                        '& label.Mui-focused': {
                          color: '#fff',
                        },
                        '& .MuiOutlinedInput-input': {
                          color: '#1a237e',
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Ubicación"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      variant="outlined"
                      sx={{ 
                        bgcolor: 'rgba(17, 39, 119, 0.1)', 
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&:hover fieldset': {
                            borderColor: '#fff',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#fff',
                          },
                        },
                        '& label': {
                          color: '#1a237e',
                        },
                        '& label.Mui-focused': {
                          color: '#fff',
                        },
                        '& .MuiOutlinedInput-input': {
                          color: '#1a237e',
                        },
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Biografía"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      variant="outlined"
                      multiline
                      rows={4}
                      sx={{ 
                        bgcolor: 'rgba(17, 39, 119, 0.1)', 
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          },
                          '&:hover fieldset': {
                            borderColor: '#fff',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#fff',
                          },
                        },
                        '& label': {
                          color: '#1a237e',
                        },
                        '& label.Mui-focused': {
                          color: '#fff',
                        },
                        '& .MuiOutlinedInput-input': {
                          color: '#1a237e',
                        },
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        sx={{
                          bgcolor: '#1a237e',
                          color: '#fff',
                          '&:hover': {
                            bgcolor: '#0d47a1',
                          },
                          marginRight: '10px'
                        }}
                      >
                        Guardar Cambios
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={() => navigate("/profile")}
                        sx={{
                          bgcolor: '#1a237e',
                          color: '#fff',
                          '&:hover': {
                            bgcolor: '#0d47a1',
                          },
                        }}
                      >
                        Volver al Perfil
                      </Button>
                    </Box>
                  </Stack>
                </form>
              </Grid>
            </Grid>
          </StyledPaper>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default EditProfile;
