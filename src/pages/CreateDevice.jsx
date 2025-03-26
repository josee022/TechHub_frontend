import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDevice } from "../service/api";
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

const CreateDevice = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "",
    estado: true,
    ubicacion: "",
    descripcion: "",
    modelo_firmware: "",
    imagen: null,
  });

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
      
      // Añadir todos los campos al FormData
      Object.keys(formData).forEach(key => {
        if (key === 'imagen' && formData[key]) {
          deviceFormData.append(key, formData[key]);
        } else if (key !== 'imagen') {
          deviceFormData.append(key, formData[key]);
        }
      });

      await createDevice(deviceFormData);
      navigate("/products");
    } catch (error) {
      console.error("Error al crear el dispositivo:", error);
      setError("Error al crear el dispositivo. Por favor, inténtalo de nuevo.");
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

  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 min-h-screen">
      <Header />
      <Container maxWidth="md" className="py-20">
        <Paper className="p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl">
          <Typography variant="h4" className="text-3xl font-bold text-gray-800 mb-6">
            Crear Nuevo Dispositivo
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
                {loading ? "Creando..." : "Crear Dispositivo"}
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

export default CreateDevice;
