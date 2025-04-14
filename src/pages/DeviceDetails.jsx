import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDeviceDetails,
  getDeviceReviews,
  getAverageRating,
  createReview,
  deleteReview,
  updateReview,
  deleteDevice,
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
  Avatar,
  CircularProgress,
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
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

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

  // Estado de carga
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
        <Header />
        <Container
          maxWidth="lg"
          className="py-20 flex justify-center items-center"
        >
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress
              size={60}
              thickness={4}
              sx={{ color: "white", mb: 3 }}
            />
            <Typography variant="h6" sx={{ color: "white" }}>
              Cargando detalles del dispositivo...
            </Typography>
          </Box>
        </Container>
        <Footer />
      </div>
    );
  }

  // Estado de error (dispositivo no encontrado)
  if (!device) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
        <Header />
        <Container
          maxWidth="lg"
          className="py-20 flex justify-center items-center"
        >
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "16px",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              maxWidth: "500px",
            }}
          >
            <Typography variant="h5" color="error" gutterBottom>
              Dispositivo no encontrado
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              No pudimos encontrar el dispositivo que estás buscando.
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate("/products")}
              sx={{
                borderRadius: "12px",
                px: 3,
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
              }}
            >
              Volver a Dispositivos
            </Button>
          </Paper>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900">
      <Header />
      <Container maxWidth="lg" className="py-16">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        >
          {/* Botones de navegación */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
              pb: 3,
              borderBottom: "1px solid",
              borderColor: "rgba(0,0,0,0.08)",
            }}
          >
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/products")}
              variant="outlined"
              sx={{
                borderRadius: "12px",
                px: 3,
                py: 1,
                "&:hover": {
                  backgroundColor: "rgba(59, 130, 246, 0.08)",
                },
              }}
            >
              Volver a Dispositivos
            </Button>

            {isOwner && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  startIcon={<EditIcon />}
                  onClick={() => navigate(`/edit-device/${id}`)}
                  variant="contained"
                  sx={{
                    borderRadius: "12px",
                    px: 3,
                    py: 1,
                    background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                    boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.4)",
                    "&:hover": {
                      background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                      boxShadow: "0 6px 20px 0 rgba(59, 130, 246, 0.6)",
                    },
                  }}
                >
                  Editar
                </Button>
                <Button
                  onClick={() => {
                    if (
                      window.confirm(
                        "¿Estás seguro de que quieres eliminar este dispositivo?"
                      )
                    ) {
                      deleteDevice(id)
                        .then(() => {
                          navigate("/products");
                        })
                        .catch((error) => {
                          console.error(
                            "Error al eliminar el dispositivo:",
                            error
                          );
                          alert("No se pudo eliminar el dispositivo");
                        });
                    }
                  }}
                  variant="outlined"
                  color="error"
                  sx={{
                    borderRadius: "12px",
                    px: 3,
                    py: 1,
                    borderColor: "error.main",
                    "&:hover": {
                      backgroundColor: "rgba(244, 67, 54, 0.08)",
                      borderColor: "error.dark",
                    },
                  }}
                >
                  Eliminar
                </Button>
              </Box>
            )}
          </Box>

          <Grid container spacing={4}>
            {/* Imagen del dispositivo y puntuación */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: "400px",
                  width: "100%",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow:
                    "0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.05)",
                  position: "relative",
                  backgroundColor: "rgba(240, 245, 255, 0.8)",
                  mb: 3,
                }}
              >
                {device.imagen_url && !imageError ? (
                  <img
                    src={device.imagen_url}
                    alt={device.nombre}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition:
                        "transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    }}
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <ImageIcon sx={{ fontSize: 80, color: "#b0bec5", mb: 2 }} />
                    <Typography variant="h6" sx={{ color: "#78909c" }}>
                      Sin imagen disponible
                    </Typography>
                  </Box>
                )}
              </Box>
              
              {/* Puntuación debajo de la imagen */}
              {average && (
                <Box
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow:
                      "0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 4px 6px -2px rgba(59, 130, 246, 0.1)",
                  }}
                >
                  <Box sx={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    alignItems: "center", 
                    mr: 3 
                  }}>
                    <Box sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      position: "relative",
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                    }}>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          fontWeight: "bold", 
                          textAlign: "center",
                          zIndex: 2,
                        }}
                      >
                        {average.average_rating.toFixed(1)}
                      </Typography>
                      <StarIcon 
                        sx={{ 
                          color: "#FFD700", 
                          position: "absolute",
                          top: "-10px",
                          right: "-10px",
                          fontSize: 28,
                          filter: "drop-shadow(0px 2px 3px rgba(0,0,0,0.2))"
                        }} 
                      />
                    </Box>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        mt: 1, 
                        fontWeight: "medium",
                        opacity: 0.9
                      }}
                    >
                      de 5 puntos
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="body1" sx={{ fontWeight: "medium" }}>
                      Valoración de usuarios
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      basado en {average.review_count}{" "}
                      {average.review_count === 1 ? "reseña" : "reseñas"}
                    </Typography>
                    <Box sx={{ display: "flex", mt: 1 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                          key={star}
                          sx={{
                            color: star <= Math.round(average.average_rating) ? "#FFD700" : "rgba(255, 255, 255, 0.3)",
                            fontSize: 20,
                            mr: 0.5
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              )}
            </Grid>

            {/* Detalles del dispositivo */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  p: 3,
                  borderRadius: "16px",
                  backgroundColor: "rgba(240, 245, 255, 0.5)",
                  backdropFilter: "blur(8px)",
                  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.8)",
                }}
              >
                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "bold",
                      color: "#1a237e",
                      mb: 2,
                    }}
                  >
                    {device.nombre}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                    <Chip
                      label={device.estado ? "Activo" : "Inactivo"}
                      color={device.estado ? "success" : "error"}
                      sx={{
                        fontWeight: "bold",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        px: 1,
                      }}
                    />
                    <Chip
                      label={device.tipo}
                      color="primary"
                      sx={{
                        fontWeight: "medium",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                        px: 1,
                      }}
                    />
                  </Box>
                </Box>

                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    p: 3,
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    color: "#37474f",
                    lineHeight: 1.6,
                  }}
                >
                  {device.descripcion || "Sin descripción disponible"}
                </Typography>

                <Box
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "medium",
                      color: "#1a237e",
                      mb: 2,
                      borderBottom: "1px solid",
                      borderColor: "rgba(0,0,0,0.08)",
                      pb: 1,
                    }}
                  >
                    Información Técnica
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          py: 0.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "medium", color: "#455a64" }}
                        >
                          Ubicación:
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#37474f" }}>
                          {device.ubicacion || "No especificada"}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          py: 0.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "medium", color: "#455a64" }}
                        >
                          Fecha de creación:
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#37474f" }}>
                          {new Date(device.created_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          py: 0.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "medium", color: "#455a64" }}
                        >
                          Última actualización:
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#37474f" }}>
                          {new Date(device.updated_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          py: 0.5,
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: "medium", color: "#455a64" }}
                        >
                          Propietario:
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#37474f" }}>
                          {device.owner ? device.owner.username : "Desconocido"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Sección de reseñas */}
          <Box sx={{ mt: 6 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#1a237e",
                mb: 4,
                pb: 2,
                borderBottom: "1px solid",
                borderColor: "rgba(0,0,0,0.08)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <StarIcon sx={{ mr: 1, color: "#3b82f6" }} />
              Reseñas y Valoraciones
            </Typography>

            {!userReviewExists && (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  mb: 4,
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
                  backdropFilter: "blur(10px)",
                  boxShadow:
                    "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 3,
                    fontWeight: "medium",
                    color: "#1a237e",
                  }}
                >
                  ¿Has usado este dispositivo? ¡Comparte tu experiencia!
                </Typography>

                <form onSubmit={handleReviewSubmit}>
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body1"
                      sx={{ mb: 1, fontWeight: "medium" }}
                    >
                      Calificación:
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <IconButton
                          key={star}
                          onClick={() => setRating(star)}
                          size="large"
                          sx={{ p: 1 }}
                        >
                          <StarIcon
                            sx={{
                              color: star <= rating ? "#FFB400" : "#D1D5DB",
                              fontSize: 32,
                              transition: "all 0.2s",
                              "&:hover": {
                                transform: "scale(1.2)",
                              },
                            }}
                          />
                        </IconButton>
                      ))}
                    </Box>
                  </Box>

                  <TextField
                    label="Tu comentario"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    multiline
                    rows={3}
                    fullWidth
                    variant="outlined"
                    sx={{
                      mb: 3,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                      },
                    }}
                    placeholder="Comparte tu experiencia con este dispositivo..."
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={submitting}
                    sx={{
                      borderRadius: "12px",
                      px: 4,
                      py: 1.2,
                      background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                      boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.4)",
                      "&:hover": {
                        background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                        boxShadow: "0 6px 20px 0 rgba(59, 130, 246, 0.6)",
                      },
                    }}
                  >
                    {submitting ? (
                      <>
                        <CircularProgress
                          size={20}
                          color="inherit"
                          sx={{ mr: 1 }}
                        />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Reseña"
                    )}
                  </Button>
                </form>
              </Paper>
            )}

            {reviews.length === 0 ? (
              <Box
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: "16px",
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: "#455a64", fontStyle: "italic" }}
                >
                  Aún no hay reseñas para este dispositivo. ¡Sé el primero en
                  opinar!
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {reviews.map((review) => (
                  <Paper
                    key={review.id}
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: "16px",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      boxShadow:
                        "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)",
                      transition: "all 0.3s",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow:
                          "0 15px 20px -3px rgba(0, 0, 0, 0.1), 0 8px 8px -2px rgba(0, 0, 0, 0.05)",
                      },
                    }}
                  >
                    {editingReviewId === review.id ? (
                      // Formulario de edición de reseña
                      <form onSubmit={handleEditSubmit}>
                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="body1"
                            sx={{ mb: 1, fontWeight: "medium" }}
                          >
                            Calificación:
                          </Typography>
                          <Box sx={{ display: "flex" }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <IconButton
                                key={star}
                                onClick={() =>
                                  setEditData({ ...editData, rating: star })
                                }
                                size="large"
                                sx={{ p: 1 }}
                              >
                                <StarIcon
                                  sx={{
                                    color:
                                      star <= editData.rating
                                        ? "#FFB400"
                                        : "#D1D5DB",
                                    fontSize: 32,
                                  }}
                                />
                              </IconButton>
                            ))}
                          </Box>
                        </Box>

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
                          sx={{
                            mb: 3,
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "12px",
                            },
                          }}
                        />

                        <Box sx={{ display: "flex", gap: 2 }}>
                          <Button
                            type="submit"
                            variant="contained"
                            sx={{
                              borderRadius: "12px",
                              px: 3,
                              background:
                                "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                            }}
                          >
                            Guardar Cambios
                          </Button>
                          <Button
                            onClick={() => setEditingReviewId(null)}
                            variant="outlined"
                            sx={{ borderRadius: "12px", px: 3 }}
                          >
                            Cancelar
                          </Button>
                        </Box>
                      </form>
                    ) : (
                      // Vista de reseña
                      <>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          {review.user.avatar_url ? (
                            <Avatar
                              src={review.user.avatar_url}
                              alt={review.user.username}
                              sx={{
                                width: 48,
                                height: 48,
                                mr: 2,
                                border: "2px solid white",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                              }}
                            />
                          ) : (
                            <Avatar
                              sx={{
                                width: 48,
                                height: 48,
                                mr: 2,
                                bgcolor: "primary.main",
                                color: "white",
                                fontWeight: "bold",
                                border: "2px solid white",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                              }}
                            >
                              {review.user.username[0].toUpperCase()}
                            </Avatar>
                          )}

                          <Box sx={{ flexGrow: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: "bold" }}
                            >
                              {review.user.username}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "text.secondary" }}
                            >
                              {format(
                                new Date(review.created_at),
                                "d 'de' MMMM, yyyy",
                                { locale: es }
                              )}
                            </Typography>
                          </Box>

                          <Box sx={{ display: "flex" }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <StarIcon
                                key={star}
                                sx={{
                                  color:
                                    star <= review.rating
                                      ? "#FFB400"
                                      : "#D1D5DB",
                                  fontSize: 20,
                                }}
                              />
                            ))}
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            p: 2,
                            borderRadius: "12px",
                            backgroundColor: "rgba(240, 245, 255, 0.5)",
                            mb: 2,
                          }}
                        >
                          <Typography variant="body1" sx={{ color: "#37474f" }}>
                            {review.comment}
                          </Typography>
                        </Box>

                        {isReviewAuthor(review) && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: 1,
                            }}
                          >
                            <Button
                              onClick={() => handleEditClick(review)}
                              size="small"
                              startIcon={<EditIcon />}
                              variant="outlined"
                              sx={{
                                borderRadius: "8px",
                                textTransform: "none",
                              }}
                            >
                              Editar
                            </Button>
                            <Button
                              onClick={() => handleDeleteClick(review.id)}
                              size="small"
                              variant="outlined"
                              color="error"
                              sx={{
                                borderRadius: "8px",
                                textTransform: "none",
                              }}
                            >
                              Eliminar
                            </Button>
                          </Box>
                        )}
                      </>
                    )}
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default DeviceDetails;
