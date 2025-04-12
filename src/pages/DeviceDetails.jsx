import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDeviceDetails,
  getDeviceReviews,
  getAverageRating,
  createReview,
  deleteReview,
  updateReview,
  deleteDevice
} from "../service/api";
import {
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Box,
  Button,
  IconButton,
  TextField,
  Avatar
} from "@mui/material";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageIcon from "@mui/icons-material/Image";
import StarIcon from "@mui/icons-material/Star";

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
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editData, setEditData] = useState({ rating: 5, comment: "" });
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

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

  const handleDeleteClick = async (reviewId) => {
    const confirm = window.confirm(
      "¿Estás seguro de que quieres eliminar tu reseña?"
    );
    if (!confirm) return;

    try {
      await deleteReview(id, reviewId); // id es el deviceId desde useParams()

      // Refrescar reseñas y media
      const [newReviews, newAverage] = await Promise.all([
        getDeviceReviews(id),
        getAverageRating(id),
      ]);
      setReviews(newReviews);
      setAverage(newAverage);
      setUserReviewExists(false); // mostrar formulario otra vez si era su única review
    } catch (error) {
      alert("Error al eliminar la reseña.");
      console.error(error);
    }
  };

  const handleEditClick = (review) => {
    setEditingReviewId(review.id);
    setEditData({ rating: review.rating, comment: review.comment });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateReview(id, editingReviewId, editData);

      // Actualizar reseñas y media
      const [newReviews, newAverage] = await Promise.all([
        getDeviceReviews(id),
        getAverageRating(id),
      ]);
      setReviews(newReviews);
      setAverage(newAverage);
      setEditingReviewId(null); // Cerrar formulario
    } catch (error) {
      alert("Error al actualizar la reseña.");
      console.error(error);
    }
  };

  // Función para comprobar si el usuario es el autor de una reseña
  const isReviewAuthor = (review) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    return userData && review.user && userData.id === review.user.id;
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <Container maxWidth="lg" className="flex-grow py-8">
        <Paper className="p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
          {/* Botones de navegación */}
          <Box className="flex justify-between items-center mb-6">
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/products")}
              variant="outlined"
              className="hover:bg-blue-50"
            >
              Volver
            </Button>
            <div className="flex gap-2">
              {isOwner && (
                <>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => navigate(`/edit-device/${id}`)}
                    variant="contained"
                    color="primary"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => {
                      if (window.confirm("¿Estás seguro de que quieres eliminar este dispositivo?")) {
                        deleteDevice(id)
                          .then(() => {
                            navigate("/products");
                          })
                          .catch((error) => {
                            console.error("Error al eliminar el dispositivo:", error);
                            alert("No se pudo eliminar el dispositivo");
                          });
                      }
                    }}
                    variant="contained"
                    color="error"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Eliminar
                  </Button>
                </>
              )}
            </div>
          </Box>

          <Grid container spacing={4}>
            {/* Imagen del dispositivo */}
            <Grid item xs={12} md={6}>
              <div className="w-full h-96 rounded-xl overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md flex items-center justify-center">
                {device.imagen_url && !imageError ? (
                  <img
                    src={device.imagen_url}
                    alt={device.nombre}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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
              <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md h-full">
                <Typography variant="h4" className="font-bold mb-4 text-blue-800 border-b pb-2">
                  {device.nombre}
                </Typography>

                <Box className="flex gap-2 mb-4">
                  <Chip
                    label={device.estado ? "Activo" : "Inactivo"}
                    color={device.estado ? "success" : "error"}
                    className="shadow-sm"
                  />
                  <Chip 
                    label={device.tipo} 
                    color="primary" 
                    className="shadow-sm"
                  />
                </Box>

                <Typography variant="body1" className="mb-6 text-gray-700 bg-blue-50 p-4 rounded-lg">
                  {device.descripcion || "Sin descripción"}
                </Typography>

                <Box className="space-y-3 mb-4 bg-gray-50 p-4 rounded-lg">
                  <Typography variant="subtitle1" className="font-semibold text-blue-800">
                    Información Técnica
                  </Typography>
                  <div className="grid grid-cols-1 gap-2">
                    <Typography variant="body2" className="flex justify-between">
                      <span className="font-medium text-gray-700">Ubicación:</span>
                      <span className="text-gray-900">{device.ubicacion || "No especificada"}</span>
                    </Typography>
                    <Typography variant="body2" className="flex justify-between">
                      <span className="font-medium text-gray-700">Modelo de Firmware:</span>
                      <span className="text-gray-900">{device.modelo_firmware || "No especificado"}</span>
                    </Typography>
                    <Typography variant="body2" className="flex justify-between">
                      <span className="font-medium text-gray-700">Propietario:</span>
                      <span className="text-gray-900">{device.user?.username || "No especificado"}</span>
                    </Typography>
                    <Typography variant="body2" className="flex justify-between">
                      <span className="font-medium text-gray-700">Fecha de Creación:</span>
                      <span className="text-gray-900">{format(new Date(device.fecha_creacion), "PPp", {
                        locale: es,
                      })}</span>
                    </Typography>
                    <Typography variant="body2" className="flex justify-between">
                      <span className="font-medium text-gray-700">Última Actualización:</span>
                      <span className="text-gray-900">{format(new Date(device.last_updated), "PPp", { locale: es })}</span>
                    </Typography>
                  </div>
                </Box>
                
                {average && (
                  <div className="bg-blue-600 text-white p-3 rounded-lg shadow-md flex items-center justify-center mt-4">
                    <StarIcon sx={{ color: '#FFD700', marginRight: 1 }} />
                    <Typography variant="h6" className="font-bold">
                      {average.average_rating || 0}
                      <span className="text-sm font-normal ml-1">/ 5</span>
                    </Typography>
                    <Typography variant="body2" className="ml-2">
                      basado en {average.review_count} {average.review_count === 1 ? 'reseña' : 'reseñas'}
                    </Typography>
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
          
          {/* Sección de reseñas */}
          <Box className="mt-10">
            <Typography variant="h5" className="font-bold mb-4 text-blue-800 border-b pb-2">
              Reseñas
            </Typography>

            {!userReviewExists && (
              <Paper className="p-6 mb-6 bg-blue-50 rounded-xl shadow-md">
                <Typography variant="h6" className="mb-3 font-semibold text-blue-800">
                  ¿Has usado este dispositivo? ¡Comparte tu experiencia!
                </Typography>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="flex items-center">
                    <Typography variant="body1" className="mr-4 font-medium">
                      Calificación:
                    </Typography>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <IconButton
                          key={star}
                          onClick={() => setRating(star)}
                          size="small"
                        >
                          <StarIcon
                            sx={{
                              color: star <= rating ? "#FFB400" : "#D1D5DB",
                              fontSize: 28,
                            }}
                          />
                        </IconButton>
                      ))}
                    </div>
                  </div>
                  <TextField
                    label="Tu comentario"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                    variant="outlined"
                    className="bg-white rounded-lg"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={submitting}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {submitting ? "Enviando..." : "Enviar Reseña"}
                  </Button>
                </form>
              </Paper>
            )}

            {reviews.length === 0 ? (
              <Typography variant="body2" className="text-gray-600 italic">
                Aún no hay reseñas para este dispositivo. ¡Sé el primero en opinar!
              </Typography>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Paper key={review.id} className="p-5 mb-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                    {editingReviewId === review.id ? (
                      <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div className="flex items-center">
                          <Typography variant="body1" className="mr-4 font-medium">
                            Calificación:
                          </Typography>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <IconButton
                                key={star}
                                onClick={() =>
                                  setEditData({ ...editData, rating: star })
                                }
                                size="small"
                              >
                                <StarIcon
                                  sx={{
                                    color:
                                      star <= editData.rating
                                        ? "#FFB400"
                                        : "#D1D5DB",
                                    fontSize: 28,
                                  }}
                                />
                              </IconButton>
                            ))}
                          </div>
                        </div>
                        <TextField
                          label="Tu comentario"
                          value={editData.comment}
                          onChange={(e) =>
                            setEditData({
                              ...editData,
                              comment: e.target.value,
                            })
                          }
                          multiline
                          rows={3}
                          fullWidth
                          variant="outlined"
                          className="bg-white rounded-lg"
                        />
                        <div className="flex gap-2">
                          <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            Guardar Cambios
                          </Button>
                          <Button
                            onClick={() => setEditingReviewId(null)}
                            variant="outlined"
                          >
                            Cancelar
                          </Button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <Box className="flex items-center gap-3 mb-3">
                          {review.user.avatar_url ? (
                            <Avatar
                              src={review.user.avatar_url}
                              alt={review.user.username}
                              className="w-10 h-10 border-2 border-white shadow-sm"
                            />
                          ) : (
                            <Avatar
                              className="w-10 h-10 bg-blue-600 text-white font-bold"
                            >
                              {review.user.username[0].toUpperCase()}
                            </Avatar>
                          )}
                          <div>
                            <Typography variant="subtitle1" className="font-semibold">
                              {review.user.username}
                            </Typography>
                            <Typography variant="caption" className="text-gray-500">
                              {format(
                                new Date(review.created_at),
                                "d 'de' MMMM, yyyy",
                                { locale: es }
                              )}
                            </Typography>
                          </div>
                          <div className="ml-auto flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon
                                key={star}
                                sx={{
                                  color:
                                    star <= review.rating ? "#FFB400" : "#D1D5DB",
                                  fontSize: 20,
                                }}
                              />
                            ))}
                          </div>
                        </Box>
                        <Typography variant="body1" className="mb-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
                          {review.comment}
                        </Typography>
                        {isReviewAuthor(review) && (
                          <Box className="flex justify-end gap-2">
                            <Button
                              onClick={() => handleEditClick(review)}
                              size="small"
                              startIcon={<EditIcon />}
                              variant="outlined"
                              color="primary"
                            >
                              Editar
                            </Button>
                            <Button
                              onClick={() => handleDeleteClick(review.id)}
                              size="small"
                              variant="outlined"
                              color="error"
                            >
                              Eliminar
                            </Button>
                          </Box>
                        )}
                      </>
                    )}
                  </Paper>
                ))}
              </div>
            )}
          </Box>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default DeviceDetails;
