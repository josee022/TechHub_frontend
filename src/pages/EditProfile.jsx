import React, { useEffect, useState } from "react";
import { getUserProfile, updateUserProfile } from "../service/api";
import { Typography, Container, Paper, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    user: {
      username: "",
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
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("location", formData.location);
      
      // El avatar se envía solo si es un archivo nuevo
      if (formData.avatar instanceof File) {
        formDataToSend.append("avatar", formData.avatar);
      }

      console.log("Enviando datos del formulario:");
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
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
    <Container>
      <Paper className="p-8">
        <Typography variant="h4" gutterBottom>
          Editar Perfil
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre de usuario"
            variant="outlined"
            fullWidth
            value={formData.user.username}
            onChange={handleChange}
            name="username"
            margin="normal"
          />
          <TextField
            label="Bio"
            variant="outlined"
            fullWidth
            value={formData.bio}
            onChange={handleChange}
            name="bio"
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            label="Ubicación"
            variant="outlined"
            fullWidth
            value={formData.location}
            onChange={handleChange}
            name="location"
            margin="normal"
          />
          <div style={{ marginTop: "20px", marginBottom: "20px" }}>
            {formData.avatar && !(formData.avatar instanceof File) && (
              <div style={{ marginBottom: "10px" }}>
                <img 
                  src={`http://localhost:8000${formData.avatar}`} 
                  alt="Current Avatar" 
                  style={{ maxWidth: "100px" }}
                />
              </div>
            )}
            <input 
              type="file" 
              name="avatar" 
              accept="image/*" 
              onChange={handleFileChange}
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              style={{ marginRight: "10px" }}
            >
              Guardar Cambios
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={() => navigate("/profile")}
            >
              Volver al Perfil
            </Button>
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default EditProfile;
