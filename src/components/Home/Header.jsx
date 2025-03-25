import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const Header = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  // ⏫ Detectar si hay usuario logueado en localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    setUsername(savedUsername);
  }, []);

  // 🧼 Escuchar cambios en el storage (por si otro componente hace logout/login)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("username");
      setUsername(updatedUser);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  return (
    <header className="p-6 bg-opacity-60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Typography variant="h4" className="text-white font-bold text-4xl">
          TechHub
        </Typography>

        {username ? (
          <div className="flex space-x-4 items-center">
            <Link to="/profile">
              <Button className="text-white hover:underline">
                👋 Hola, {username}
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              className="text-white border-white hover:bg-white hover:text-blue-500"
              variant="outlined"
              color="secondary"
            >
              Cerrar sesión
            </Button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login">
              <Button
                variant="outlined"
                color="secondary"
                className="text-white border-white hover:bg-white hover:text-blue-500"
              >
                Iniciar sesión
              </Button>
            </Link>
            <Link to="/register">
              <Button
                variant="contained"
                color="primary"
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                Registrarse
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
