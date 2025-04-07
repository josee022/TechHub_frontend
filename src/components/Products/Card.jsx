import React, { useState } from "react";
import { Card as MuiCard, CardContent, Typography, Chip, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import ImageIcon from '@mui/icons-material/Image';

const ProductCard = ({ device }) => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:8000';
  const [imageError, setImageError] = useState(false);

  return (
    <MuiCard 
      className="h-full transition-transform duration-300 hover:scale-105 cursor-pointer bg-white/90 backdrop-blur-sm"
      onClick={() => navigate(`/device/${device.id}`)}
    >
      <div className="w-full h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
        {device.imagen && !imageError ? (
          <img
            src={device.imagen.startsWith('http') ? device.imagen : `${API_URL}${device.imagen}`}
            alt={device.nombre}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <ImageIcon sx={{ fontSize: 48, marginBottom: 1 }} />
            <span>Sin imagen</span>
          </div>
        )}
      </div>
      
      <CardContent>
        <Typography variant="h6" className="font-bold text-gray-800 mb-2">
          {device.nombre}
        </Typography>

        <Box className="flex gap-2 mb-3">
          <Chip
            label={device.estado ? "Activo" : "Inactivo"}
            color={device.estado ? "success" : "error"}
            size="small"
          />
          <Chip
            label={device.tipo}
            color="primary"
            size="small"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" className="mb-2">
          {device.descripcion || "Sin descripción"}
        </Typography>

        <Box className="mt-4 space-y-1">
          <Typography variant="caption" className="text-gray-600 block">
            <strong>Propietario:</strong> {device.user?.username || "No especificado"}
          </Typography>
          <Typography variant="caption" className="text-gray-600 block">
            <strong>Creado:</strong> {format(new Date(device.fecha_creacion), "PPp", { locale: es })}
          </Typography>
        </Box>
      </CardContent>
    </MuiCard>
  );
};

export default ProductCard;
