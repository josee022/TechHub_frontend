import React, { useState } from "react";
import { Button, TextField, Typography, Container, Paper, Box } from "@mui/material";
import { motion } from "framer-motion"; // Para animaciones
import { Link } from "react-router-dom"; // Enlace para redirigir a login

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación de contraseñas
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Aquí puedes enviar la solicitud al backend para crear el usuario
    try {
      console.log("Registrando usuario:", { username, email, password, bio, location });

      // Enviar solicitud al backend (esto es solo un ejemplo)
      // await axios.post('/api/users/register', { username, email, password, bio, location });

      // Si el registro es exitoso, redirige al usuario al login
      // history.push("/login"); // Redirige a la página de login
    } catch (err) {
      setError("Error al registrar el usuario. Inténtalo de nuevo.");
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
              Regístrate en TechHub
            </Typography>
            <Typography className="text-center text-gray-600 mb-8">
              Únete a nuestra plataforma para gestionar tus dispositivos IoT de manera eficiente.
            </Typography>

            {/* Formulario de registro */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo para el nombre de usuario */}
              <TextField
                label="Nombre de usuario"
                variant="outlined"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
              />

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

              {/* Campo para confirmar la contraseña */}
              <TextField
                label="Confirmar Contraseña"
                variant="outlined"
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                required
              />

              {/* Campo para la biografía */}
              <TextField
                label="Biografía (Opcional)"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="input-field"
              />

              {/* Campo para la ubicación */}
              <TextField
                label="Ubicación (Opcional)"
                variant="outlined"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-field"
              />

              {/* Mostrar error si lo hay */}
              {error && (
                <Typography className="text-red-500 text-center">{error}</Typography>
              )}

              {/* Botón de registro */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4 text-white hover:bg-indigo-700 transition duration-300"
              >
                Registrarse
              </Button>

              {/* Link a la vista de login */}
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
        </Paper>
      </Container>
    </div>
  );
};

export default RegisterPage;
