import React, { useState } from "react";
import { Button, TextField, Typography, Container, Paper, Box } from "@mui/material";
import { motion } from "framer-motion"; // Para animaciones
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Aquí va la lógica para hacer el login con la API
    // Puedes usar axios para hacer la solicitud a tu API
    try {
      // Simulando un request
      console.log("Enviando credenciales:", { email, password });
      // Si el login es exitoso, redirige al usuario
      // history.push("/products");  // Usa el hook history para redirigir a la vista de productos
    } catch (err) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 min-h-screen flex justify-center items-center">
      <Container maxWidth="lg">
        <Paper className="bg-white p-8 rounded-xl shadow-xl max-w-lg mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h4" className="text-center font-bold text-gray-800 mb-6">
              Iniciar sesión
            </Typography>
            <Typography className="text-center text-gray-600 mb-8">
              Bienvenido a <span className="font-bold text-indigo-600">TechHub</span>, la plataforma de gestión de dispositivos IoT.
            </Typography>

            {/* Formulario de login */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo para el correo electrónico */}
              <TextField
                label="Correo electrónico"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />

              {/* Campo para la contraseña */}
              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />

              {/* Mostrar error si lo hay */}
              {error && (
                <Typography className="text-red-500 text-center">{error}</Typography>
              )}

              {/* Botón de login */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4 text-white hover:bg-indigo-700 transition duration-300"
              >
                Iniciar sesión
              </Button>

              {/* Link a la vista de registro */}
              <div className="text-center mt-4">
                <Typography className="text-gray-600">
                  ¿No tienes una cuenta?{" "}
                  <Link to="/register" className="text-indigo-600 hover:underline">
                    Regístrate aquí
                  </Link>
                </Typography>
              </div>
            </form>
          </motion.div>

          {/* Información adicional de la empresa */}
          <Box className="mt-12 text-center text-white">
            <Typography variant="body2" className="font-medium mb-4">
              TechHub es tu solución completa para gestionar dispositivos IoT con facilidad y eficiencia.
            </Typography>
            <Typography variant="body2" className="font-light">
              Únete a miles de usuarios que ya confían en nuestra plataforma para monitorear, controlar y analizar sus dispositivos IoT.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginPage;
