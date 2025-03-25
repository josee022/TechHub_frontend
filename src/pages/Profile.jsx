import React, { useEffect, useState } from "react";
import { getUserProfile } from "../service/api";
import { Typography, Container, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    <Container>
      <Paper className="p-8">
        <Typography variant="h4" gutterBottom>
          Perfil de {userData.user?.username}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Correo: {userData.user?.email}
        </Typography>

        <Typography variant="body1" paragraph>
          Bio: {userData.bio || "No hay bio"}
        </Typography>
        <Typography variant="body1" paragraph>
          Ubicación: {userData.location || "No especificada"}
        </Typography>
        
        {userData.avatar && (
          <img 
            src={`http://localhost:8000${userData.avatar}`} 
            alt="Avatar" 
            style={{ maxWidth: "200px", marginTop: "10px", marginBottom: "20px" }}
          />
        )}

        <div style={{ marginTop: "20px" }}>
          <Button 
            onClick={() => navigate("/edit-profile")} 
            variant="contained" 
            color="primary"
          >
            Editar Perfil
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
