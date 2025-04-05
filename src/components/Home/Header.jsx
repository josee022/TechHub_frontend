import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getCurrentUser, getImageUrl } from '../../service/api';

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const user = getCurrentUser();
        
        if (token && user) {
          setIsLoggedIn(true);
          setUserData(user);
        } else {
          setIsLoggedIn(false);
          setUserData(null);
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuth();
    // Escuchar cambios en localStorage
    window.addEventListener('storage', checkAuth);
    
    // También verificar cada vez que el componente se monta
    const interval = setInterval(checkAuth, 5000);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserData(null);
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar position="sticky" className="bg-gradient-to-r from-blue-600 to-indigo-800">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" className="text-white no-underline flex-grow">
          TechHub
        </Typography>

        {isLoggedIn ? (
          <>
            <Button color="inherit" component={Link} to="/products">
              Dispositivos
            </Button>
            <Button color="inherit" component={Link} to="/dashboard">
              Informes
            </Button>
            <IconButton
              onClick={handleMenu}
              color="inherit"
              className="ml-2"
            >
              {userData?.avatar ? (
                <Avatar src={getImageUrl(userData.avatar)} alt={userData.username} />
              ) : (
                <AccountCircleIcon />
              )}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>
                <Typography variant="body2">
                  {userData?.username || 'Usuario'}
                </Typography>
              </MenuItem>
              <MenuItem component={Link} to="/profile" onClick={handleClose}>
                Mi Perfil
              </MenuItem>
              <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Iniciar Sesión
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Registrarse
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
