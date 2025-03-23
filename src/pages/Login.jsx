import React, { useState } from "react";
import { Button, TextField, Typography, Container, Paper, Box } from "@mui/material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../service/api";
import useStore from "../store/useStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser({ username, password });
      const token = res.access;

      localStorage.setItem("token", token);
      setUser({ username }); // Aquí podrías guardar más datos si los obtienes luego

      navigate("/products");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Credenciales incorrectas.");
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

            <form onSubmit={handleLogin} className="space-y-6">
              <TextField
                label="Nombre de usuario"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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

              {error && (
                <Typography className="text-red-500 text-center">{error}</Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4 text-white hover:bg-indigo-700 transition duration-300"
              >
                Iniciar sesión
              </Button>

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

export default LoginPage;
