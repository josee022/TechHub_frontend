import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDeviceDetails, getDeviceReviews, getAverageRating, createReview } from "../service/api";
import { Container, Paper, Typography, Grid, Chip, Box, Button } from "@mui/material";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ImageIcon from '@mui/icons-material/Image';

const DeviceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(null);
  const [userReviewExists, setUserReviewExists] = useState(false);
  const [rating, setRating] = useState(5);
const [comment, setComment] = useState("");
const [submitting, setSubmitting] = useState(false);
  const API_URL = 'http://localhost:8000';

  useEffect(() => {
    const fetchDeviceDetails = async () => {
      try {
        const data = await getDeviceDetails(id);
        setDevice(data);
        setImageError(false);
  
        const userData = JSON.parse(localStorage.getItem("user"));
        if (userData && data.user) {
          const isAdmin = userData.role === "admin";
          const isOwner = parseInt(userData.id) === parseInt(data.user.id);
          setIsOwner(isAdmin || isOwner);
        }
  
        // Obtener reseñas y puntuación
        const [reviewData, averageData] = await Promise.all([
          getDeviceReviews(id),
          getAverageRating(id),
        ]);
  
        setReviews(reviewData);
        setAverage(averageData);
        
        if (userData) {
          const userHasReview = reviewData.some(
            (review) => review.user.id === userData.id
          );
          setUserReviewExists(userHasReview);
        }
  
      } catch (error) {
        console.error("Error al obtener los detalles del dispositivo:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDeviceDetails();
  }, [id]);  

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
  
    try {
      await createReview(id, { rating, comment });
  
      setComment("");
      setRating(5);
      setUserReviewExists(true);
  
      // Recargar reseñas y media
      const [newReviews, newAverage] = await Promise.all([
        getDeviceReviews(id),
        getAverageRating(id),
      ]);
      setReviews(newReviews);
      setAverage(newAverage);
  
    } catch (error) {
      alert("Ocurrió un error al enviar tu reseña.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };  

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 min-h-screen">
        <Header />
        <Container className="py-20">
          <Typography variant="h5" className="text-white text-center">
            Cargando detalles del dispositivo...
          </Typography>
        </Container>
        <Footer />
      </div>
    );
  }

  if (!device) {
    return (
      <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 min-h-screen">
        <Header />
        <Container className="py-20">
          <Typography variant="h5" className="text-white text-center">
            Dispositivo no encontrado
          </Typography>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 min-h-screen">
      <Header />
      <Container maxWidth="lg" className="py-20">
        <Paper className="p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
          {/* Botones de navegación */}
          <Box className="flex justify-between items-center mb-6">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/products")}
              variant="outlined"
            >
              Volver
            </Button>
            {isOwner && (
              <Button
                startIcon={<EditIcon />}
                onClick={() => navigate(`/edit-device/${id}`)}
                variant="contained"
                color="primary"
              >
                Editar Dispositivo
              </Button>
            )}
          </Box>

          <Grid container spacing={4}>
            {/* Imagen del dispositivo */}
            <Grid item xs={12} md={6}>
              <div className="w-full h-96 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {device.imagen && !imageError ? (
                  <img
                    src={device.imagen.startsWith('http') ? device.imagen : `${API_URL}${device.imagen}`}
                    alt={device.nombre}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <ImageIcon sx={{ fontSize: 64, marginBottom: 2 }} />
                    <Typography variant="h6" color="textSecondary">
                      Sin imagen
                    </Typography>
                  </div>
                )}
              </div>
            </Grid>

            {/* Detalles del dispositivo */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" className="font-bold mb-4">
                {device.nombre}
              </Typography>

              <Box className="flex gap-2 mb-4">
                <Chip
                  label={device.estado ? "Activo" : "Inactivo"}
                  color={device.estado ? "success" : "error"}
                />
                <Chip label={device.tipo} color="primary" />
              </Box>

              <Typography variant="body1" className="mb-4">
                {device.descripcion || "Sin descripción"}
              </Typography>

              <Box className="space-y-2 mb-4">
                <Typography variant="body2">
                  <strong>Ubicación:</strong> {device.ubicacion || "No especificada"}
                </Typography>
                <Typography variant="body2">
                  <strong>Modelo de Firmware:</strong> {device.modelo_firmware || "No especificado"}
                </Typography>
                <Typography variant="body2">
                  <strong>Propietario:</strong> {device.user?.username || "No especificado"}
                </Typography>
                <Typography variant="body2">
                  <strong>Fecha de Creación:</strong>{" "}
                  {format(new Date(device.fecha_creacion), "PPp", { locale: es })}
                </Typography>
                <Typography variant="body2">
                  <strong>Última Actualización:</strong>{" "}
                  {format(new Date(device.last_updated), "PPp", { locale: es })}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box className="mt-10">
          <Typography variant="h5" className="font-bold mb-4">
            Reseñas
          </Typography>

          {average && (
            <Typography variant="body1" className="mb-2">
              ⭐ <strong>{average.average_rating || 0}</strong>/5 basado en {average.review_count} reseñas
            </Typography>
          )}

          {reviews.length === 0 ? (
            <Typography variant="body2">Aún no hay reseñas para este dispositivo.</Typography>
          ) : (
            reviews.map((review) => (
              <Paper key={review.id} className="p-4 mb-4">
                <Box className="flex items-center gap-2 mb-1">
                  {review.user.avatar ? (
                    <img
                      src={`http://localhost:8000${review.user.avatar}`}
                      alt={review.user.username}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
                      {review.user.username[0]}
                    </div>
                  )}
                  <Typography variant="subtitle2">{review.user.username}</Typography>
                </Box>
                <Typography variant="body2" className="mb-1">
                  ⭐ {review.rating} / 5
                </Typography>
                <Typography variant="body2">{review.comment}</Typography>
                <Typography variant="caption" color="textSecondary">
                  {new Date(review.created_at).toLocaleString()}
                </Typography>
              </Paper>
            ))
          )}
        </Box>
        {!userReviewExists && (
  <Box component="form" onSubmit={handleReviewSubmit} className="mt-6 p-4 border rounded-lg bg-white/80">
    <Typography variant="h6" className="mb-2">Deja tu reseña</Typography>

    <Box className="mb-3">
      <label className="block mb-1 font-medium">Puntuación (1-5):</label>
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full border rounded px-3 py-2"
      >
        {[5, 4, 3, 2, 1].map((value) => (
          <option key={value} value={value}>
            {value} ⭐
          </option>
        ))}
      </select>
    </Box>

    <Box className="mb-3">
      <label className="block mb-1 font-medium">Comentario:</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className="w-full border rounded px-3 py-2"
        placeholder="Escribe tu opinión aquí..."
        required
        minLength={10}
      />
    </Box>

    <Button type="submit" variant="contained" color="primary" disabled={submitting}>
      {submitting ? "Enviando..." : "Enviar reseña"}
    </Button>
  </Box>
)}
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default DeviceDetails;
