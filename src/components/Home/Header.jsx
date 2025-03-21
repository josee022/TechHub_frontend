import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const Header = () => {
  return (
    <header className="p-6 bg-opacity-60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Typography variant="h4" className="text-white font-bold text-4xl">
          TechHub
        </Typography>
        <div className="flex space-x-4">
          <Link to="/login">
            <Button
              variant="outlined"
              color="secondary"
              className="text-white border-white hover:bg-white hover:text-blue-500 transition duration-300"
            >
              Iniciar sesión
            </Button>
          </Link>
          <Link to="/register">
            <Button
              variant="contained"
              color="primary"
              className="bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
            >
              Registrarse
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
