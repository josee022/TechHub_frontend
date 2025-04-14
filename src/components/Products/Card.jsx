import React, { useState } from "react";
import { 
  Card as MuiCard, 
  CardContent, 
  Typography, 
  Chip, 
  Box, 
  CardActionArea, 
  CardMedia,
  Avatar,
  Tooltip,
  Skeleton
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import ImageIcon from '@mui/icons-material/Image';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ProductCard = ({ device }) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Función para truncar texto
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <MuiCard 
      sx={{
        height: '100%',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.15), 0 0 5px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <CardActionArea 
        onClick={() => navigate(`/device/${device.id}`)}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <div className="relative">
          {/* Badge para estado */}
          <div className="absolute top-3 right-3 z-10">
            <Chip
              label={device.estado ? "Activo" : "Inactivo"}
              color={device.estado ? "success" : "error"}
              size="small"
              sx={{ 
                fontWeight: 'bold',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                px: 1,
                '& .MuiChip-label': {
                  px: 1
                }
              }}
            />
          </div>
          
          {/* Imagen con efecto de carga */}
          <div className="w-full h-56 overflow-hidden">
            {device.imagen_url && !imageError ? (
              <Box sx={{ position: 'relative' }}>
                {imageLoading && (
                  <Skeleton 
                    variant="rectangular" 
                    width="100%" 
                    height={224} 
                    animation="wave"
                    sx={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      zIndex: 1,
                      bgcolor: 'rgba(200, 200, 255, 0.1)'
                    }}
                  />
                )}
                <CardMedia
                  component="img"
                  height="224"
                  image={device.imagen_url}
                  alt={device.nombre}
                  sx={{
                    width: '100%',
                    height: '224px',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    },
                    filter: 'brightness(0.95)'
                  }}
                  onError={() => setImageError(true)}
                  onLoad={() => setImageLoading(false)}
                />
              </Box>
            ) : (
              <div 
                className="w-full h-56 flex flex-col items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)'
                }}
              >
                <ImageIcon sx={{ fontSize: 64, color: '#b0bec5', mb: 1 }} />
                <Typography variant="body2" sx={{ color: '#78909c' }}>
                  Sin imagen disponible
                </Typography>
              </div>
            )}
          </div>
        </div>
        
        <CardContent sx={{ 
          p: 3, 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          '&:last-child': { pb: 3 }
        }}>
          {/* Tipo de dispositivo */}
          <Box sx={{ mb: 2 }}>
            <Chip
              label={device.tipo}
              size="small"
              sx={{
                bgcolor: 'primary.light',
                color: 'white',
                fontWeight: 'medium',
                fontSize: '0.75rem',
                height: '24px',
                borderRadius: '6px',
              }}
            />
          </Box>
          
          {/* Título */}
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#1a237e', 
              mb: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {device.nombre}
          </Typography>
          
          {/* Descripción */}
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              mb: 2,
              flexGrow: 1,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: '40px'
            }}
          >
            {device.descripcion || "Sin descripción disponible"}
          </Typography>
          
          {/* Ubicación si existe */}
          {device.ubicacion && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOnIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {truncateText(device.ubicacion, 25)}
              </Typography>
            </Box>
          )}
          
          {/* Footer con fecha y rating */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            pt: 2,
            mt: 'auto',
            borderTop: '1px solid rgba(0,0,0,0.05)'
          }}>
            <Tooltip title={device.fecha_creacion && format(new Date(device.fecha_creacion), "PPP", { locale: es })}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                {device.fecha_creacion && format(new Date(device.fecha_creacion), "PP", { locale: es })}
              </Typography>
            </Tooltip>
            
            {device.average_rating > 0 ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <StarIcon sx={{ fontSize: 16, color: '#FFB400', mr: 0.5 }} />
                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                  {device.average_rating.toFixed(1)} 
                  <Typography component="span" variant="caption" sx={{ color: 'text.secondary', ml: 0.5 }}>
                    ({device.review_count})
                  </Typography>
                </Typography>
              </Box>
            ) : (
              <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                Sin valoraciones
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </MuiCard>
  );
};

export default ProductCard;
