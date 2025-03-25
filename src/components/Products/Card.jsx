import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom"; // Enlace para ir a la página de detalles del dispositivo

const ProductCard = ({ device }) => {
  return (
    <Card className="bg-white rounded-xl shadow-lg hover:scale-105 transition-transform">
      <CardContent>
        <Typography variant="h6" className="text-xl font-semibold text-gray-800 mb-2">
          {device.nombre}
        </Typography>

        <Typography variant="body2" className="text-gray-600 mb-2">
          <strong>Tipo:</strong> {device.tipo}
        </Typography>

        <Typography variant="body2" className="text-gray-600 mb-4">
          <strong>Estado:</strong> {device.estado ? "Activo" : "Inactivo"}
        </Typography>

        {/* Descripción del dispositivo */}
        <Typography variant="body2" className="text-gray-700 mb-4">
          {device.descripcion ? device.descripcion.substring(0, 50) + "..." : "No hay descripción disponible."}
        </Typography>

        {/* Botón para ver detalles */}
        <Link to={`/device/${device.id}`}>
          <Button variant="contained" color="primary" className="w-full">
            Ver detalles
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
