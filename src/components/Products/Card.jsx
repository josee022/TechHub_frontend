import React, { useState } from "react";
import { Card as MuiCard, CardContent, Typography, Chip, Box, CardActionArea, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import ImageIcon from '@mui/icons-material/Image';
import StarIcon from '@mui/icons-material/Star';

const ProductCard = ({ device }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  return (
    <MuiCard 
      className="h-full transition-transform duration-300 hover:scale-105 shadow-lg rounded-xl overflow-hidden bg-white/95 backdrop-blur-sm"
    >
      <CardActionArea onClick={() => navigate(`/device/${device.id}`)}>
        <div className="relative">
          {/* Badge para estado */}
          <div className="absolute top-2 right-2 z-10">
            <Chip
              label={device.estado ? "Activo" : "Inactivo"}
              color={device.estado ? "success" : "error"}
              size="small"
              className="shadow-md"
            />
          </div>
          
          {/* Imagen */}
          <div className="w-full h-56 overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50">
            {device.imagen_url && !imageError ? (
              <CardMedia
                component="img"
                height="140"
                image={device.imagen_url}
                alt={device.nombre}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <ImageIcon sx={{ fontSize: 64, marginBottom: 1 }} />
                <span>Sin imagen</span>
              </div>
            )}
          </div>
        </div>
        
        <CardContent className="p-4">
          {/* Título y tipo */}
          <div className="mb-3">
            <Typography variant="h6" className="font-bold text-gray-800 mb-1 line-clamp-1">
              {device.nombre}
            </Typography>
            <Chip
              label={device.tipo}
              color="primary"
              size="small"
              className="mr-2"
            />
          </div>
          
          {/* Descripción */}
          <Typography variant="body2" className="text-gray-600 mb-3 line-clamp-2 min-h-[40px]">
            {device.descripcion || "Sin descripción"}
          </Typography>
          
          {/* Footer con fecha y rating */}
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
            <Typography variant="caption" className="text-gray-500">
              {device.fecha_creacion && format(new Date(device.fecha_creacion), "PP", { locale: es })}
            </Typography>
            
            {device.average_rating > 0 && (
              <div className="flex items-center">
                <StarIcon sx={{ fontSize: 16, color: '#FFB400' }} />
                <Typography variant="body2" className="ml-1 font-medium">
                  {device.average_rating.toFixed(1)} 
                  <span className="text-gray-500 text-xs ml-1">({device.review_count})</span>
                </Typography>
              </div>
            )}
          </div>
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
};

export default ProductCard;
