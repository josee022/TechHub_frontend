import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDeviceDetails, updateDevice } from "../service/api";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Box,
  Alert,
} from "@mui/material";
import Header from "../components/Home/Header";
import Footer from "../components/Home/Footer";

const EditDevice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:8000';
  
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    estado: true,
    ubicacion: "",
    descripcion: "",
    modelo_firmware: "",
    imagen: null,
  });

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const data = await getDeviceDetails(id);
        console.log("Device data:", data);
        
        setFormData({
          nombre: data.nombre || "",
          tipo: data.tipo || "",
          estado: data.estado,
          ubicacion: data.ubicacion || "",
          descripcion: data.descripcion || "",
          modelo_firmware: data.modelo_firmware || "",
        });

        // Si hay una imagen, establecer la preview
        if (data.imagen) {
          setPreviewUrl(data.imagen.startsWith('http') ? data.imagen : `${API_URL.replace('/api', '')}${data.imagen}`);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el dispositivo:", error);
        setError("No se pudo cargar el dispositivo o no tienes permisos para editarlo");
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, imagen: file }));
      
      // Crear URL para preview
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const deviceFormData = new FormData();
      
      // Añadir todos los campos excepto imagen
      Object.keys(formData).forEach(key => {
        if (key !== 'imagen') {
          deviceFormData.append(key, formData[key]);
        }
      });
      
      // Añadir imagen si se seleccionó una nueva
      if (formData.imagen instanceof File) {
        deviceFormData.append('imagen', formData.imagen);
      }

      console.log("Enviando datos actualizados:", formData);
      await updateDevice(id, deviceFormData);
      navigate("/products");
    } catch (error) {
      console.error("Error al actualizar el dispositivo:", error);
      setError("Error al actualizar el dispositivo. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "estado" ? checked : value
    }));
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 min-h-screen">
        <Header />
        <Container className="py-20">
          <Typography variant="h5" className="text-white text-center">
            Cargando dispositivo...
          </Typography>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 min-h-screen">
      <Header />
      <Container maxWidth="md" className="py-20">
        <Paper className="p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
          <Typography variant="h4" className="text-3xl font-bold text-gray-800 mb-6">
            Editar Dispositivo
          </Typography>

          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
              fullWidth
              label="Nombre del Dispositivo"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Tipo de Dispositivo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
              variant="outlined"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.estado}
                  onChange={handleChange}
                  name="estado"
                  color="primary"
                />
              }
              label="Estado (Activo/Inactivo)"
            />

            <TextField
              fullWidth
              label="Ubicación"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Modelo de Firmware"
              name="modelo_firmware"
              value={formData.modelo_firmware}
              onChange={handleChange}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Descripción"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              multiline
              rows={4}
              variant="outlined"
            />

            <Box className="space-y-2">
              <Typography variant="subtitle1" className="text-gray-700">
                Imagen del Dispositivo
              </Typography>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {previewUrl && (
                <Box className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="max-w-xs rounded-lg shadow"
                  />
                </Box>
              )}
            </Box>

            <Box className="flex gap-4 pt-4">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                className="w-full"
              >
                {loading ? "Guardando..." : "Guardar Cambios"}
              </Button>
              <Button
                type="button"
                variant="outlined"
                onClick={() => navigate("/products")}
                className="w-full"
              >
                Cancelar
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
};

export default EditDevice;
