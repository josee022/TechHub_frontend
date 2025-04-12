import React, { useState } from "react";
import { Card as MuiCard, CardContent, Typography, Chip, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import ImageIcon from '@mui/icons-material/Image';

const ProductCard = ({ device }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  return (
    <MuiCard 
      className="h-full transition-transform duration-300 hover:scale-105 cursor-pointer bg-white/90 backdrop-blur-sm"
      onClick={() => navigate(`/device/${device.id}`)}
    >
      <div className="w-full h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
        {device.imagen_url && !imageError ? (
          <img
            src={device.imagen_url}
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

        <Typography variant="body2" className="text-gray-600 mb-2 line-clamp-2">
          {device.descripcion || "Sin descripción"}
        </Typography>

        <Typography variant="caption" className="text-gray-500 block">
          {device.fecha_creacion && format(new Date(device.fecha_creacion), "PPP", { locale: es })}
        </Typography>

        {device.average_rating > 0 && (
          <Typography variant="body2" className="mt-1">
            ⭐ {device.average_rating.toFixed(1)} ({device.review_count})
          </Typography>
        )}
      </CardContent>
    </MuiCard>
  );
};

export default ProductCard;
