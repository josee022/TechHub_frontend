import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../service/api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // 1️⃣ Registro
      await registerUser({ username, email, password });

      // 2️⃣ Login automático
      const res = await loginUser({ username, password });
      const token = res.access;

      // 3️⃣ Guardar token y usuario
      localStorage.setItem("token", token);

      // 4️⃣ Redirigir
      navigate("/login");
    } catch (err) {
      console.error("Error al registrar:", err);
      if (err.response?.data) {
        console.log("Detalles del error:", err.response.data);
      }
      setError("Error al registrar. Verifica los datos.");
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
            <Typography
              variant="h4"
              className="text-center font-bold text-gray-800 mb-6"
            >
              Regístrate en TechHub
            </Typography>
            <Typography className="text-center text-gray-600 mb-8">
              Únete a nuestra plataforma para gestionar tus dispositivos IoT de
              manera eficiente.
            </Typography>

            <form onSubmit={handleSubmit} className="space-y-6">
              <TextField
                label="Nombre de usuario"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <TextField
                label="Correo electrónico"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <TextField
                label="Contraseña"
                variant="outlined"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <TextField
                label="Confirmar Contraseña"
                variant="outlined"
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {error && (
                <Typography className="text-red-500 text-center">
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4 text-white hover:bg-indigo-700 transition duration-300"
              >
                Registrarse
              </Button>

              <div className="text-center mt-4">
                <Typography className="text-gray-600">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to="/login" className="text-indigo-600 hover:underline">
                    Inicia sesión aquí
                  </Link>
                </Typography>
              </div>
            </form>
          </motion.div>

          <Box className="mt-12 text-center text-gray-600">
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

export default RegisterPage;
