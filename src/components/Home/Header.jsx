import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        console.log('DEBUG - Header - Token:', token ? 'exists' : 'not found');
        console.log('DEBUG - Header - User data:', userStr);
        
        if (token) {
          setIsLoggedIn(true);
          if (userStr) {
            try {
              const userData = JSON.parse(userStr);
              console.log('DEBUG - Header - Parsed user data:', userData);
              setUserData(userData);
            } catch (e) {
              console.error('DEBUG - Header - Error parsing user data:', e);
              setUserData(null);
            }
          } else {
            console.log('DEBUG - Header - No user data found');
            setUserData(null);
          }
        } else {
          console.log('DEBUG - Header - No token found, logging out');
          setIsLoggedIn(false);
          setUserData(null);
        }
      } catch (error) {
        console.error('DEBUG - Header - Error checking auth:', error);
        setIsLoggedIn(false);
        setUserData(null);
      }
    };

    checkAuth();
    // Escuchar cambios en localStorage
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
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
                <Avatar
                src={
                  userData?.avatar?.startsWith("http")
                    ? userData.avatar
                    : import.meta.env.VITE_API_URL.replace('/api', '') + userData?.avatar
                }
                alt={userData?.username}
              />              
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
