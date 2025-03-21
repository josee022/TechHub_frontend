import React from "react";
import { BsFillGearFill, BsBarChartFill } from "react-icons/bs";
import { Box, Typography } from "@mui/material";

const Features = () => {
  return (
    <div className="py-20 px-4 bg-gray-100 rounded-xl shadow-lg">
      <Typography
        variant="h3"
        className="text-4xl font-extrabold text-center text-blue-700 mb-12"
      >
        Características Principales
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Box className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <BsFillGearFill className="text-blue-600 text-5xl mb-4 mx-auto" />
          <Typography variant="h6" className="text-2xl font-semibold text-center text-blue-600">
            Gestión fácil de dispositivos
          </Typography>
          <Typography variant="body2" className="text-gray-600 text-center mt-4">
            Con nuestra plataforma, podrás gestionar todos tus dispositivos IoT desde un único lugar, con una interfaz intuitiva y fácil de usar.
          </Typography>
        </Box>
        <Box className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <BsBarChartFill className="text-green-600 text-5xl mb-4 mx-auto" />
          <Typography variant="h6" className="text-2xl font-semibold text-center text-green-600">
            Análisis de Datos Inteligente
          </Typography>
          <Typography variant="body2" className="text-gray-600 text-center mt-4">
            Aprovecha los análisis en tiempo real y el procesamiento de datos para mejorar la toma de decisiones sobre tus dispositivos IoT.
          </Typography>
        </Box>
        <Box className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
          <BsFillGearFill className="text-yellow-600 text-5xl mb-4 mx-auto" />
          <Typography variant="h6" className="text-2xl font-semibold text-center text-yellow-600">
            Monitoreo en tiempo real
          </Typography>
          <Typography variant="body2" className="text-gray-600 text-center mt-4">
            Visualiza el estado y el rendimiento de tus dispositivos en tiempo real, y recibe alertas automáticas de cualquier anomalía.
          </Typography>
        </Box>
      </div>
    </div>
  );
};

export default Features;
