import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem, 
  Avatar, 
  Box, 
  Container,
  useScrollTrigger,
  Slide,
  Tooltip,
  Divider,
  Badge
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DevicesIcon from '@mui/icons-material/Devices';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { motion } from 'framer-motion';

// Componente para ocultar el AppBar al hacer scroll hacia abajo
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        
        if (token) {
          setIsLoggedIn(true);
          if (userStr) {
            try {
              const userData = JSON.parse(userStr);
              setUserData(userData);
            } catch (e) {
              console.error('Error parsing user data:', e);
              setUserData(null);
            }
          } else {
            setUserData(null);
          }
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
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserData(null);
    handleClose();
    handleMobileMenuClose();
    navigate('/login');
  };

  // Verificar si la ruta actual está activa
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Variantes para animaciones
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    })
  };

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(8px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ py: 1 }}>
            {/* Logo */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={logoVariants}
            >
              <Typography 
                variant="h5" 
                component={Link} 
                to="/" 
                sx={{
                  textDecoration: 'none',
                  color: 'white',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  mr: 3
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '0.3rem',
                    mr: 1,
                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                  }}
                >
                  TH
                </Box>
                TechHub
              </Typography>
            </motion.div>

            {/* Menú de navegación para escritorio */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {isLoggedIn && (
                <>
                  <motion.div
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                  >
                    <Button 
                      component={Link} 
                      to="/products"
                      startIcon={<DevicesIcon />}
                      sx={{ 
                        color: 'white', 
                        mx: 1,
                        opacity: isActive('/products') ? 1 : 0.8,
                        borderBottom: isActive('/products') ? '2px solid #3b82f6' : 'none',
                        borderRadius: 0,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          opacity: 1
                        }
                      }}
                    >
                      Dispositivos
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                  >
                    <Button 
                      component={Link} 
                      to="/dashboard"
                      startIcon={<DashboardIcon />}
                      sx={{ 
                        color: 'white', 
                        mx: 1,
                        opacity: isActive('/dashboard') ? 1 : 0.8,
                        borderBottom: isActive('/dashboard') ? '2px solid #3b82f6' : 'none',
                        borderRadius: 0,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          opacity: 1
                        }
                      }}
                    >
                      Informes
                    </Button>
                  </motion.div>
                </>
              )}
            </Box>

            {/* Botones de autenticación o perfil */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {isLoggedIn ? (
                <motion.div
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                >
                  <Tooltip title="Opciones de perfil">
                    <IconButton
                      onClick={handleMenu}
                      sx={{ 
                        ml: 2,
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: '50%',
                              backgroundColor: '#4ade80',
                              border: '2px solid rgba(15, 23, 42, 0.85)'
                            }}
                          />
                        }
                      >
                        <Avatar
                          src={userData?.avatar_url || null}
                          alt={userData?.username}
                          sx={{ 
                            width: 40, 
                            height: 40,
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            bgcolor: !userData?.avatar_url ? '#3b82f6' : undefined,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {!userData?.avatar_url && userData?.username?.charAt(0).toUpperCase()}
                        </Avatar>
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        minWidth: 180,
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                        borderRadius: 2,
                        '& .MuiMenuItem-root': {
                          px: 2,
                          py: 1,
                          my: 0.5,
                          borderRadius: 1,
                          mx: 1
                        }
                      }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <Box sx={{ px: 2, py: 1.5 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {userData?.username || 'Usuario'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {userData?.email || 'usuario@techhub.com'}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem component={Link} to="/profile" onClick={handleClose} sx={{ gap: 1.5 }}>
                      <PersonIcon fontSize="small" color="primary" />
                      Mi Perfil
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ gap: 1.5 }}>
                      <LogoutIcon fontSize="small" color="error" />
                      Cerrar Sesión
                    </MenuItem>
                  </Menu>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                  >
                    <Button 
                      component={Link} 
                      to="/login"
                      variant="outlined"
                      sx={{ 
                        color: 'white', 
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        mr: 1.5,
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)'
                        }
                      }}
                    >
                      Iniciar Sesión
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                  >
                    <Button 
                      component={Link} 
                      to="/register"
                      variant="contained"
                      sx={{ 
                        background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                        '&:hover': {
                          background: 'linear-gradient(90deg, #2563eb, #7c3aed)'
                        }
                      }}
                    >
                      Registrarse
                    </Button>
                  </motion.div>
                </>
              )}
            </Box>

            {/* Menú móvil */}
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileMenuAnchorEl}
                open={Boolean(mobileMenuAnchorEl)}
                onClose={handleMobileMenuClose}
                PaperProps={{
                  sx: {
                    width: '100%',
                    maxWidth: 300,
                    mt: 1.5,
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    borderRadius: 2
                  }
                }}
              >
                {isLoggedIn ? (
                  <>
                    <Box sx={{ px: 2, py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={userData?.avatar_url || null}
                        alt={userData?.username}
                        sx={{ 
                          width: 40, 
                          height: 40,
                          bgcolor: !userData?.avatar_url ? '#3b82f6' : undefined
                        }}
                      >
                        {!userData?.avatar_url && userData?.username?.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {userData?.username || 'Usuario'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {userData?.email || 'usuario@techhub.com'}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem 
                      component={Link} 
                      to="/products" 
                      onClick={handleMobileMenuClose}
                      sx={{ gap: 2 }}
                    >
                      <DevicesIcon fontSize="small" color="primary" />
                      Dispositivos
                    </MenuItem>
                    <MenuItem 
                      component={Link} 
                      to="/dashboard" 
                      onClick={handleMobileMenuClose}
                      sx={{ gap: 2 }}
                    >
                      <DashboardIcon fontSize="small" color="primary" />
                      Informes
                    </MenuItem>
                    <MenuItem 
                      component={Link} 
                      to="/profile" 
                      onClick={handleMobileMenuClose}
                      sx={{ gap: 2 }}
                    >
                      <PersonIcon fontSize="small" color="primary" />
                      Mi Perfil
                    </MenuItem>
                    <Divider sx={{ my: 1 }} />
                    <MenuItem onClick={handleLogout} sx={{ gap: 2 }}>
                      <LogoutIcon fontSize="small" color="error" />
                      Cerrar Sesión
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem 
                      component={Link} 
                      to="/login" 
                      onClick={handleMobileMenuClose}
                      sx={{ gap: 2 }}
                    >
                      <PersonIcon fontSize="small" color="primary" />
                      Iniciar Sesión
                    </MenuItem>
                    <MenuItem 
                      component={Link} 
                      to="/register" 
                      onClick={handleMobileMenuClose}
                      sx={{ gap: 2 }}
                    >
                      <AccountCircleIcon fontSize="small" color="primary" />
                      Registrarse
                    </MenuItem>
                  </>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
};

export default Header;
